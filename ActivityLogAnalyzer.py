from collections import defaultdict
from functools import reduce

logs = [
    {"user": "CSB24001", "action": "YouTube",   "duration": 45.5},
    {"user": "CSB24002", "action": "Instagram", "duration": 30.0},
    {"user": "CSB24001", "action": "VS Code",   "duration": 120.0},
    {"user": "CSB24003", "action": "YouTube",   "duration": 60.0},
    {"user": "CSB24002", "action": "WhatsApp",  "duration": 25.5},
    {"user": "CSB24003", "action": "Slack",     "duration": 15.0},
    {"user": "CSB24001", "action": "Chrome",    "duration": 90.0},
    {"user": "CSB24002", "action": "VS Code",   "duration": 80.0},
]

def total_time_per_user(logs: list[dict]) -> dict[str, float]:
    d = defaultdict(float)
    for log in logs:
        d[log["user"]] += log["duration"]
    return dict(d)                     #O(n)

def most_active_users(logs: list[dict], k: int) -> list[str]:
    totals = total_time_per_user(logs)
    return [u for u, _ in sorted(totals.items(), key=lambda x: x[1], reverse=True)[:k]]  #O(ulogu + n)

def unique_actions(logs: list[dict]) -> set[str]:
    return {log["action"] for log in logs}  #O(n)

def total_activity_time(logs: list[dict]) -> float:
    return reduce(lambda acc, log: acc + log["duration"], logs, 0.0)  #O(n)


if __name__ == "__main__":
    totals = total_time_per_user(logs)

    print("\n    Activity Log Summary    \n")

    print("Total Time per User:")
    for u, t in sorted(totals.items()):
        print(f"{u:10} : {t:.1f} min")

    print("\nTop 2 Most Active Users:")
    print(", ".join(most_active_users(logs, 2)))

    print("\nUnique Actions:")
    print(", ".join(sorted(unique_actions(logs))))

    print(f"\nGrand Total Activity: {total_activity_time(logs):.1f} min\n")