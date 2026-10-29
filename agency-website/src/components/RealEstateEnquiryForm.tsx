"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Send, Loader2, AlertCircle, MessageSquare } from "lucide-react";
import { trackEvent } from "../utils/analytics";

interface RealEstateEnquiryFormProps {
  id?: string;
  sourcePage?: string;
  heading?: string;
  subheading?: string;
}

export default function RealEstateEnquiryForm({
  id = "crm-enquiry",
  sourcePage = "/real-estate-crm-dubai",
  heading = "Request Real Estate CRM & Automation Consultation",
  subheading = "Speak with our technology consultants regarding your agency's portal ingestion, CRM architecture, or WhatsApp speed-to-lead workflow.",
}: RealEstateEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    crmPlatform: "",
    primaryRequirement: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const accessKey = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "").trim();
      if (!accessKey) {
        throw new Error(
          "Enquiry service is currently unconfigured. Please connect with our team directly on WhatsApp (+971 54 586 6094)."
        );
      }

      const submissionData = new FormData();
      submissionData.append("access_key", accessKey);
      submissionData.append("name", formData.name.trim());
      submissionData.append("email", formData.email.trim());
      submissionData.append("phone", formData.phone.trim());
      submissionData.append("crm_platform", formData.crmPlatform);
      submissionData.append("primary_requirement", formData.primaryRequirement);
      if (formData.message.trim()) {
        submissionData.append("notes", formData.message.trim());
      }
      submissionData.append(
        "subject",
        `🏢 Real Estate CRM Inquiry: ${formData.name.trim()} (${formData.crmPlatform || "Not Specified"})`
      );
      submissionData.append("from_name", "Asif Digital Real Estate Intake");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData,
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Submission failed. Please check your network connection and try again."
        );
      }

      // Verified GA4 conversion event: fires strictly on accepted submission with ZERO PII
      trackEvent("generate_lead", {
        form_name: "Real Estate CRM Inquiry Form",
        service_name: formData.primaryRequirement || "Real Estate CRM",
        lead_type: "real_estate_inquiry",
        page_path: sourcePage,
      });

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        crmPlatform: "",
        primaryRequirement: "",
        message: "",
      });
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (err: any) {
      console.error("Real Estate Form Error:", err);
      setErrorMessage(
        err?.message ||
          "We could not submit your inquiry at this moment. Please message us on WhatsApp (+971 54 586 6094)."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id={id}
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-black/70 p-6 sm:p-10 backdrop-blur-xl shadow-2xl text-left max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 block mb-2 font-semibold">
          Tailored Agency Architecture
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-snug">
          {heading}
        </h3>
        <p className="text-xs sm:text-sm text-white/70 font-light mt-2 leading-relaxed">
          {subheading}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Anti-spam honeypot */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5 text-xs text-white/80">
            <span className="font-mono text-[11px] uppercase text-white/60">Your Name *</span>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Tariq Al Mansoori"
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none transition-colors"
            />
          </label>

          <label className="block space-y-1.5 text-xs text-white/80">
            <span className="font-mono text-[11px] uppercase text-white/60">Corporate Email *</span>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. tariq@brokerage.ae"
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none transition-colors"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5 text-xs text-white/80">
            <span className="font-mono text-[11px] uppercase text-white/60">WhatsApp / Phone *</span>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+971 50 123 4567"
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none transition-colors"
            />
          </label>

          <label className="block space-y-1.5 text-xs text-white/80">
            <span className="font-mono text-[11px] uppercase text-white/60">Current CRM / Platform *</span>
            <select
              name="crmPlatform"
              required
              value={formData.crmPlatform}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/15 bg-[#0a0a0a] px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none transition-colors"
            >
              <option value="">Select your agency CRM status</option>
              <option value="HubSpot">HubSpot (Active or Planned)</option>
              <option value="Zoho CRM / Zoho One">Zoho CRM / Zoho One</option>
              <option value="Salesforce">Salesforce</option>
              <option value="Spreadsheets (Excel / Google Sheets)">Spreadsheets (Excel / Sheets)</option>
              <option value="PropSpace / Masterkey / Legacy CRM">PropSpace / Masterkey / Legacy CRM</option>
              <option value="Evaluating CRM Options (No CRM yet)">Evaluating CRM Options (No CRM yet)</option>
              <option value="Custom Database / Other">Custom Database / Other</option>
            </select>
          </label>
        </div>

        <div>
          <label className="block space-y-1.5 text-xs text-white/80">
            <span className="font-mono text-[11px] uppercase text-white/60">Primary Requirement *</span>
            <select
              name="primaryRequirement"
              required
              value={formData.primaryRequirement}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/15 bg-[#0a0a0a] px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none transition-colors"
            >
              <option value="">Select primary implementation requirement</option>
              <option value="CRM Implementation & Setup (HubSpot/Zoho)">
                CRM Implementation &amp; Setup (HubSpot / Zoho)
              </option>
              <option value="Portal Lead Integration (Bayut / Property Finder)">
                Portal Lead Ingestion (Bayut Pro / Property Finder Manager)
              </option>
              <option value="WhatsApp AI Qualification & Broker Handover">
                WhatsApp AI Lead Qualification &amp; Broker Handover
              </option>
              <option value="Automated Round-Robin Lead Routing">
                Automated Round-Robin Lead Assignment &amp; SLA Tracking
              </option>
              <option value="Complete Agency Automation Architecture">
                Full-Stack Real Estate Automation Infrastructure
              </option>
              <option value="Technical Audit of Current CRM Pipeline">
                Technical Audit &amp; Troubleshooting of Existing Setup
              </option>
            </select>
          </label>
        </div>

        <div>
          <label className="block space-y-1.5 text-xs text-white/80">
            <span className="font-mono text-[11px] uppercase text-white/60">
              Brief Overview of Current Challenge (Optional)
            </span>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. 20 agents; portal leads wait hours in email; need automated WhatsApp qualification and round-robin assignment into Zoho..."
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none transition-colors resize-none"
            />
          </label>
        </div>

        {/* Success Alert */}
        {isSuccess && (
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-xs leading-relaxed flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Inquiry successfully received.</strong> Our real estate technology specialists
              will review your parameters and follow up via WhatsApp or corporate email within 1
              business day.
            </span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/40 text-red-300 text-xs leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-black py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-white/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>Submitting Your Requirements...</span>
            </>
          ) : (
            <>
              <span>Submit Consultation Request</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-[11px] text-white/50 text-center leading-relaxed">
          Your information is protected under our{" "}
          <Link href="/privacy-policy" className="text-white underline hover:text-emerald-400">
            Privacy Policy
          </Link>{" "}
          and used solely to prepare your agency CRM and automation proposal. No spam.
        </p>

        {/* Direct WhatsApp Channel */}
        <div className="pt-2 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/60 mb-2 font-mono">Prefer an immediate discussion?</p>
          <a
            href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20real%20estate%20CRM%20implementation%20and%20lead%20automation%20for%20our%20brokerage."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("whatsapp_click", {
                cta_location: "real_estate_enquiry_card",
                cta_text: "WhatsApp Us Directly",
                link_url: "https://wa.me/971545866094",
              })
            }
            className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Directly on WhatsApp with an Automation Architect (+971 54 586 6094)</span>
          </a>
        </div>
      </form>
    </div>
  );
}
