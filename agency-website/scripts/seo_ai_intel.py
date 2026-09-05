import os, json
from google.oauth2 import service_account
from googleapiclient.discovery import build
import requests
from google.auth.transport.requests import Request

KEY_PATH = os.path.join(os.path.dirname(__file__), '..', 'gsc-credentials.json')
SITE_URL = "https://www.asifdigital.agency/"
GA4_PROPERTY_ID = "529560469"

def get_live_seo_intel():
    if not os.path.exists(KEY_PATH):
        print(f"Error: {KEY_PATH} not found.")
        return

    # 1. Google Search Console
    gsc_scopes = ['https://www.googleapis.com/auth/webmasters.readonly']
    gsc_creds = service_account.Credentials.from_service_account_file(KEY_PATH, scopes=gsc_scopes)
    gsc_service = build('searchconsole', 'v1', credentials=gsc_creds)

    gsc_req = {
        'startDate': '2026-08-01',
        'endDate': '2026-09-03',
        'dimensions': ['query'],
        'rowLimit': 100
    }
    gsc_resp = gsc_service.searchanalytics().query(siteUrl=SITE_URL, body=gsc_req).execute()
    queries = gsc_resp.get('rows', [])

    # 2. GA4 Analytics
    ga4_scopes = ['https://www.googleapis.com/auth/analytics.readonly']
    ga4_creds = service_account.Credentials.from_service_account_file(KEY_PATH, scopes=ga4_scopes)
    ga4_creds.refresh(Request())

    ga4_url = f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY_ID}:runReport"
    headers = {
        "Authorization": f"Bearer {ga4_creds.token}",
        "Content-Type": "application/json"
    }
    ga4_body = {
        "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
        "metrics": [{"name": "activeUsers"}, {"name": "screenPageViews"}],
        "dimensions": [{"name": "pagePath"}],
        "limit": 15
    }
    ga4_resp = requests.post(ga4_url, headers=headers, json=ga4_body).json()
    ga4_pages = ga4_resp.get('rows', [])

    print("=" * 80)
    print("           ASIF DIGITAL REAL-TIME SEO & TRAFFIC INTELLIGENCE")
    print("=" * 80)

    # Page 1 queries
    page_1 = [q for q in queries if q['position'] <= 10.0]
    striking_distance = [q for q in queries if 10.0 < q['position'] <= 20.0]

    print(f"\n[+] TOP RANKED KEYWORDS ON GOOGLE PAGE 1 ({len(page_1)} total):")
    for q in sorted(page_1, key=lambda x: x['position'])[:10]:
        print(f"  - Rank #{q['position']:<4.1f} | Imp: {q['impressions']:<4} | Clicks: {q['clicks']:<3} | \"{q['keys'][0]}\"")

    print(f"\n[+] STRIKING DISTANCE OPPORTUNITIES (PAGE 2, READY TO PUSH TO TOP 5):")
    for q in sorted(striking_distance, key=lambda x: x['impressions'], reverse=True)[:10]:
        print(f"  - Rank #{q['position']:<4.1f} | Imp: {q['impressions']:<4} | Clicks: {q['clicks']:<3} | \"{q['keys'][0]}\"")

    print(f"\n[+] TOP VISITED PAGES IN GA4 (LAST 30 DAYS):")
    for p in ga4_pages[:8]:
        path = p['dimensionValues'][0]['value']
        users = p['metricValues'][0]['value']
        views = p['metricValues'][1]['value']
        print(f"  - {path:<40} | Active Users: {users:<4} | Views: {views}")

    print("\n" + "=" * 80)

if __name__ == '__main__':
    get_live_seo_intel()
