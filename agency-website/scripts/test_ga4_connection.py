import os
from google.oauth2 import service_account
from google.auth.transport.requests import Request
import requests

KEY_PATH = os.path.join(os.path.dirname(__file__), '..', 'gsc-credentials.json')
PROPERTY_ID = "529560469"

def test_ga4():
    if not os.path.exists(KEY_PATH):
        print(f"Error: {KEY_PATH} not found.")
        return

    scopes = ['https://www.googleapis.com/auth/analytics.readonly']
    credentials = service_account.Credentials.from_service_account_file(KEY_PATH, scopes=scopes)
    credentials.refresh(Request())

    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY_ID}:runReport"
    headers = {
        "Authorization": f"Bearer {credentials.token}",
        "Content-Type": "application/json"
    }
    body = {
        "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
        "metrics": [{"name": "activeUsers"}, {"name": "screenPageViews"}, {"name": "sessions"}],
        "dimensions": [{"name": "sessionDefaultChannelGroup"}]
    }

    resp = requests.post(url, headers=headers, json=body)
    if resp.status_code == 200:
        data = resp.json()
        print("Successfully authenticated with Google Analytics 4 (GA4)!")
        print("Live Traffic Data (Last 30 Days):")
        for row in data.get('rows', []):
            channel = row['dimensionValues'][0]['value']
            users = row['metricValues'][0]['value']
            views = row['metricValues'][1]['value']
            sessions = row['metricValues'][2]['value']
            print(f"- Channel: {channel:<20} | Users: {users:<5} | Sessions: {sessions:<5} | Pageviews: {views}")
    else:
        print(f"GA4 Error {resp.status_code}: {resp.text}")

if __name__ == '__main__':
    test_ga4()
