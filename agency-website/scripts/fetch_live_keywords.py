import os
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_PATH = os.path.join(os.path.dirname(__file__), '..', 'gsc-credentials.json')
SITE_URL = "https://www.asifdigital.agency/"

def fetch_live_gsc():
    scopes = ['https://www.googleapis.com/auth/webmasters.readonly']
    credentials = service_account.Credentials.from_service_account_file(KEY_PATH, scopes=scopes)
    service = build('searchconsole', 'v1', credentials=credentials)

    # Query last 28 days
    request = {
        'startDate': '2026-08-01',
        'endDate': '2026-09-03',
        'dimensions': ['query'],
        'rowLimit': 25
    }

    response = service.searchanalytics().query(siteUrl=SITE_URL, body=request).execute()
    rows = response.get('rows', [])

    print(f"\n=== LIVE GOOGLE SEARCH CONSOLE DATA FOR {SITE_URL} ===")
    print(f"Total Queries Returned: {len(rows)}\n")
    print(f"{'Search Query':<45} | {'Clicks':<6} | {'Imp':<6} | {'CTR':<7} | {'Position'}")
    print("-" * 80)
    for r in rows:
        query = r['keys'][0]
        clicks = r['clicks']
        imp = r['impressions']
        ctr = f"{r['ctr']*100:.1f}%"
        pos = f"{r['position']:.1f}"
        print(f"{query:<45} | {clicks:<6} | {imp:<6} | {ctr:<7} | {pos}")

if __name__ == '__main__':
    fetch_live_gsc()
