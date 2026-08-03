export interface Env {
  DB: D1Database;
  LICENSE_KV?: KVNamespace;
  APP_NAME?: string;
  LICENSE_SECRET: string;
}

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const json = (data: JsonValue, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const corsJson = (data: JsonValue, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders },
  });

const testPage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cloudflare License Test</title>
    <style>
      body{margin:0;font-family:Arial,Helvetica,sans-serif;background:#f6f7fb;color:#101828}
      .wrap{max-width:860px;margin:40px auto;padding:0 20px}
      .card{background:#fff;border:1px solid #d0d5dd;border-radius:16px;padding:24px;box-shadow:0 10px 24px rgba(16,24,40,.06)}
      h1{margin:0 0 8px;font-size:28px}
      p{margin:0 0 16px;color:#667085;line-height:1.5}
      label{display:block;font-size:14px;font-weight:700;margin:14px 0 8px}
      input,textarea{width:100%;box-sizing:border-box;border:1px solid #d0d5dd;border-radius:10px;padding:12px 14px;font-size:14px;font-family:inherit;background:#fff}
      textarea{min-height:140px;resize:vertical;font-family:Consolas,"Courier New",monospace}
      .row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
      .actions{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap}
      button{border:0;border-radius:10px;background:#2563eb;color:#fff;padding:12px 18px;font-size:14px;font-weight:700;cursor:pointer}
      button:hover{background:#1d4ed8}
      pre{margin:18px 0 0;padding:16px;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:auto;min-height:160px;white-space:pre-wrap}
      .small{font-size:12px;color:#667085;margin-top:10px}
      @media (max-width:720px){.row{grid-template-columns:1fr}}
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <h1>Cloudflare License Test</h1>
        <p>Use this page to test the worker without CORS or DevTools issues.</p>
        <label for="baseUrl">Worker base URL</label>
        <input id="baseUrl" value="" placeholder="Leave blank to use the same site" />
        <div class="row">
          <div>
            <label for="activationKey">Activation key</label>
            <input id="activationKey" value="SOV-TEST-0001" />
          </div>
          <div>
            <label for="deviceHash">Device hash</label>
            <input id="deviceHash" value="device-test-001" />
          </div>
        </div>
        <label for="customerName">Customer name</label>
        <input id="customerName" value="Test Customer" />
        <label for="requestBody">Request body preview</label>
        <textarea id="requestBody" readonly></textarea>
        <div class="actions">
          <button id="sendBtn">Send Activate Request</button>
          <button id="healthBtn" type="button">Check Health</button>
        </div>
        <div class="small">Response</div>
        <pre id="output">Waiting...</pre>
      </div>
    </div>
    <script>
      const baseUrlEl = document.getElementById("baseUrl");
      const activationKeyEl = document.getElementById("activationKey");
      const deviceHashEl = document.getElementById("deviceHash");
      const customerNameEl = document.getElementById("customerName");
      const requestBodyEl = document.getElementById("requestBody");
      const outputEl = document.getElementById("output");
      const sendBtn = document.getElementById("sendBtn");
      const healthBtn = document.getElementById("healthBtn");
      function bodyObject() {
        return {
          activation_key: activationKeyEl.value.trim(),
          device_hash: deviceHashEl.value.trim(),
          customer_name: customerNameEl.value.trim(),
        };
      }
      function renderBodyPreview() {
        requestBodyEl.value = JSON.stringify(bodyObject(), null, 2);
      }
      function resolveBase() {
        const custom = baseUrlEl.value.trim();
        return custom ? custom.replace(/\\/$/, "") : window.location.origin;
      }
      async function sendRequest(path, method = "POST") {
        const url = resolveBase() + path;
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: method === "GET" ? undefined : JSON.stringify(bodyObject()),
        });
        const text = await res.text();
        outputEl.textContent = 'STATUS: ' + res.status + '\\nURL: ' + url + '\\n\\n' + text;
      }
      sendBtn.addEventListener("click", async () => {
        outputEl.textContent = "Sending...";
        try { await sendRequest("/api/license/activate", "POST"); }
        catch (err) { outputEl.textContent = String(err); }
      });
      healthBtn.addEventListener("click", async () => {
        outputEl.textContent = "Checking health...";
        try {
          const url = resolveBase() + "/health";
          const res = await fetch(url);
          const text = await res.text();
          outputEl.textContent = 'STATUS: ' + res.status + '\\nURL: ' + url + '\\n\\n' + text;
        } catch (err) {
          outputEl.textContent = String(err);
        }
      });
      [baseUrlEl, activationKeyEl, deviceHashEl, customerNameEl].forEach((el) =>
        el.addEventListener("input", renderBodyPreview)
      );
      renderBodyPreview();
    </script>
  </body>
</html>`;

const appName = (env: Env) => env.APP_NAME || "Sovereign Sales Engine";

const b64Encode = (text: string) => btoa(text);
const b64Decode = (text: string) => atob(text);

async function sha256Hex(text: string) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function makeToken(payload: Record<string, unknown>, secret: string) {
  return b64Encode(JSON.stringify(payload) + "::" + secret);
}

function readToken(token: string, secret: string) {
  try {
    const decoded = b64Decode(token);
    const idx = decoded.lastIndexOf("::");
    if (idx < 0) return null;
    const payloadRaw = decoded.slice(0, idx);
    const tokenSecret = decoded.slice(idx + 2);
    if (tokenSecret !== secret) return null;
    return JSON.parse(payloadRaw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function ensureTables(env: Env) {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS licenses (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      activation_key_hash TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      max_devices INTEGER NOT NULL DEFAULT 1
    )
  `).run();

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS devices (
      id TEXT PRIMARY KEY,
      license_id TEXT NOT NULL,
      device_hash TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      last_check_in TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (license_id) REFERENCES licenses(id)
    )
  `).run();

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS license_events (
      id TEXT PRIMARY KEY,
      license_id TEXT,
      event_type TEXT NOT NULL,
      payload TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

async function logEvent(env: Env, licenseId: string | null, eventType: string, payload: Record<string, unknown>) {
  await env.DB.prepare(
    "INSERT INTO license_events (id, license_id, event_type, payload) VALUES (?, ?, ?, ?)"
  )
    .bind(crypto.randomUUID(), licenseId, eventType, JSON.stringify(payload || {}))
    .run();
}

async function findLicenseByKeyHash(env: Env, keyHash: string) {
  return await env.DB.prepare(
    "SELECT * FROM licenses WHERE activation_key_hash = ? LIMIT 1"
  )
    .bind(keyHash)
    .first();
}

async function findDeviceByHash(env: Env, deviceHash: string) {
  return await env.DB.prepare(
    "SELECT * FROM devices WHERE device_hash = ? LIMIT 1"
  )
    .bind(deviceHash)
    .first();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    await ensureTables(env);

    const url = new URL(request.url);
    const secret = String(env.LICENSE_SECRET || "");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/" || url.pathname === "/test") {
      return new Response(testPage, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8", ...corsHeaders },
      });
    }

    if (url.pathname === "/health") {
      return corsJson({ ok: true, service: "cloudflare-license-server", app: appName(env) });
    }

    if (url.pathname === "/api/license/activate" && request.method === "POST") {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
      const activationKey = String(body.activation_key || "").trim();
      const customerName = String(body.license_holder || body.customer_name || "").trim();
      const deviceHash = String(body.device_hash || "").trim();

      if (!secret) return corsJson({ success: false, error: "Missing LICENSE_SECRET." }, 500);
      if (!activationKey) return corsJson({ success: false, error: "Activation key required." }, 400);
      if (!deviceHash) return corsJson({ success: false, error: "Device hash required." }, 400);

      const keyHash = await sha256Hex(activationKey);
      const license = await findLicenseByKeyHash(env, keyHash);
      if (!license) return corsJson({ success: false, error: "Invalid activation key." }, 403);
      if ((license as { status?: string }).status !== "active") {
        return corsJson({ success: false, error: "License is not active." }, 403);
      }

      const existingDevice = await findDeviceByHash(env, deviceHash);
      const activeCountRow = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM devices WHERE license_id = ? AND status = 'active'"
      )
        .bind((license as { id: string }).id)
        .first();
      const activeCount = Number((activeCountRow as { count?: number } | null)?.count || 0);

      if (!existingDevice && activeCount >= Number((license as { max_devices?: number }).max_devices || 1)) {
        return corsJson({ success: false, error: "Device limit reached." }, 403);
      }

      const now = new Date().toISOString();
      const deviceId = (existingDevice as { id?: string } | null)?.id || crypto.randomUUID();

      if (existingDevice) {
        await env.DB.prepare(
          "UPDATE devices SET license_id = ?, status = 'active', last_check_in = ?, updated_at = ? WHERE id = ?"
        )
          .bind((license as { id: string }).id, now, now, deviceId)
          .run();
      } else {
        await env.DB.prepare(
          "INSERT INTO devices (id, license_id, device_hash, status, last_check_in, created_at, updated_at) VALUES (?, ?, ?, 'active', ?, ?, ?)"
        )
          .bind(deviceId, (license as { id: string }).id, deviceHash, now, now, now)
          .run();
      }

      const payload = {
        license_id: (license as { id: string }).id,
        device_id: deviceId,
        customer_name: customerName || String((license as { customer_name?: string }).customer_name || ""),
        device_hash: deviceHash,
        activated_at: now,
        next_check_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      };

      const token = makeToken(payload, secret);
      await logEvent(env, (license as { id: string }).id, "activate", payload);

      return corsJson({
        success: true,
        activated: true,
        token,
        token_payload: payload,
        license_id: (license as { id: string }).id,
        device_id: deviceId,
        customer_name: customerName || String((license as { customer_name?: string }).customer_name || ""),
      });
    }

    if (url.pathname === "/api/license/verify" && request.method === "POST") {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
      const token = String(body.token || "").trim();
      const deviceHash = String(body.device_hash || "").trim();

      if (!secret) return corsJson({ success: false, error: "Missing LICENSE_SECRET." }, 500);
      if (!token) return corsJson({ success: false, error: "Token required." }, 400);
      if (!deviceHash) return corsJson({ success: false, error: "Device hash required." }, 400);

      const payload = readToken(token, secret);
      if (!payload) return corsJson({ success: false, error: "Invalid token." }, 403);
      if (payload.device_hash !== deviceHash) {
        return corsJson({ success: false, error: "Device mismatch." }, 403);
      }

      const license = await env.DB.prepare("SELECT * FROM licenses WHERE id = ? LIMIT 1")
        .bind(String(payload.license_id || ""))
        .first();
      if (!license || (license as { status?: string }).status !== "active") {
        return corsJson({ success: false, error: "License is not active." }, 403);
      }

      const device = await env.DB.prepare(
        "SELECT * FROM devices WHERE id = ? AND license_id = ? LIMIT 1"
      )
        .bind(String(payload.device_id || ""), String(payload.license_id || ""))
        .first();
      if (!device || (device as { status?: string }).status !== "active") {
        return corsJson({ success: false, error: "Device is revoked." }, 403);
      }

      const now = new Date().toISOString();
      await env.DB.prepare("UPDATE devices SET last_check_in = ?, updated_at = ? WHERE id = ?")
        .bind(now, now, String(payload.device_id || ""))
        .run();

      const renewedPayload = {
        ...payload,
        last_verified_at: now,
        next_check_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      };

      const renewedToken = makeToken(renewedPayload, secret);
      await logEvent(env, String(payload.license_id || ""), "verify", renewedPayload);

      return corsJson({
        success: true,
        active: true,
        token: renewedToken,
        next_check_at: renewedPayload.next_check_at,
        license_id: payload.license_id,
        device_id: payload.device_id,
      });
    }

    if (url.pathname === "/api/license/revoke" && request.method === "POST") {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
      const licenseId = String(body.license_id || "").trim();
      const deviceId = String(body.device_id || "").trim();

      if (!licenseId && !deviceId) {
        return corsJson({ success: false, error: "license_id or device_id required." }, 400);
      }

      if (deviceId) {
        const device = await env.DB.prepare("SELECT * FROM devices WHERE id = ? LIMIT 1")
          .bind(deviceId)
          .first();
        if (!device) return corsJson({ success: false, error: "Device not found." }, 404);

        await env.DB.prepare("UPDATE devices SET status = 'revoked', updated_at = ? WHERE id = ?")
          .bind(new Date().toISOString(), deviceId)
          .run();

        await logEvent(env, String((device as { license_id?: string }).license_id || ""), "revoke_device", {
          device_id: deviceId,
        });
        return corsJson({ success: true, revoked: true, device_id: deviceId });
      }

      const license = await env.DB.prepare("SELECT * FROM licenses WHERE id = ? LIMIT 1")
        .bind(licenseId)
        .first();
      if (!license) return corsJson({ success: false, error: "License not found." }, 404);

      await env.DB.prepare("UPDATE licenses SET status = 'revoked', updated_at = ? WHERE id = ?")
        .bind(new Date().toISOString(), licenseId)
        .run();
      await env.DB.prepare("UPDATE devices SET status = 'revoked', updated_at = ? WHERE license_id = ?")
        .bind(new Date().toISOString(), licenseId)
        .run();

      await logEvent(env, licenseId, "revoke_license", { license_id: licenseId });
      return corsJson({ success: true, revoked: true, license_id: licenseId });
    }

    if (url.pathname === "/api/license/reset-device" && request.method === "POST") {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
      const licenseId = String(body.license_id || "").trim();
      const deviceId = String(body.device_id || "").trim();

      if (!licenseId || !deviceId) {
        return corsJson({ success: false, error: "license_id and device_id required." }, 400);
      }

      const device = await env.DB.prepare(
        "SELECT * FROM devices WHERE id = ? AND license_id = ? LIMIT 1"
      )
        .bind(deviceId, licenseId)
        .first();
      if (!device) return corsJson({ success: false, error: "Device not found." }, 404);

      await env.DB.prepare("DELETE FROM devices WHERE id = ?").bind(deviceId).run();
      await logEvent(env, licenseId, "reset_device", { device_id: deviceId });

      return corsJson({ success: true, reset: true, device_id: deviceId });
    }

    return corsJson({ error: "Not found" }, 404);
  },
};
