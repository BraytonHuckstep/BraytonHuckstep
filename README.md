import tkinter as tk
from tkinter import messagebox
from datetime import datetime

# Main Application Class
class FitLifeTrackerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("FitLife Tracker")

        # Main Window
        self.main_frame = tk.Frame(self.root)
        self.main_frame.pack()

        self.welcome_label = tk.Label(self.main_frame, text="Welcome to FitLife Tracker", font=("Arial", 16))
        self.welcome_label.pack(pady=10)

        self.track_label = tk.Label(self.main_frame, text="Track Your Fitness Journey", font=("Arial", 14))
        self.track_label.pack(pady=10)

        self.log_activity_button = tk.Button(self.main_frame, text="Log Activity", command=self.open_log_activity)
        self.log_activity_button.pack(pady=5)

        self.view_history_button = tk.Button(self.main_frame, text="View History", command=self.open_view_history)
        self.view_history_button.pack(pady=5)

        self.set_goals_button = tk.Button(self.main_frame, text="Set Goals", command=self.open_set_goals)
        self.set_goals_button.pack(pady=5)

        self.exit_button = tk.Button(self.main_frame, text="Exit", command=self.root.quit)
        self.exit_button.pack(pady=5)

        self.activities = []
        self.goals = []

    def open_log_activity(self):
        self.new_window(LogActivityWindow)

    def open_view_history(self):
        self.new_window(ViewHistoryWindow)

    def open_set_goals(self):
        self.new_window(SetGoalsWindow)

    def new_window(self, window_class):
        self.new = tk.Toplevel(self.root)
        window_class(self.new, self)

class LogActivityWindow:
    def __init__(self, root, app):
        self.root = root
        self.root.title("Log Activity")
        self.app = app

        self.type_label = tk.Label(self.root, text="Type of Exercise")
        self.type_label.pack(pady=5)

        self.type_entry = tk.Entry(self.root)
        self.type_entry.pack(pady=5)

        self.duration_label = tk.Label(self.root, text="Duration (minutes)")
        self.duration_label.pack(pady=5)

        self.duration_entry = tk.Entry(self.root)
        self.duration_entry.pack(pady=5)

        self.date_label = tk.Label(self.root, text="Date (YYYY-MM-DD)")
        self.date_label.pack(pady=5)

        self.date_entry = tk.Entry(self.root)
        self.date_entry.pack(pady=5)

        self.save_button = tk.Button(self.root, text="Save", command=self.save_activity)
        self.save_button.pack(pady=5)

        self.cancel_button = tk.Button(self.root, text="Cancel", command=self.root.destroy)
        self.cancel_button.pack(pady=5)

    def save_activity(self):
        type_of_exercise = self.type_entry.get()
        duration = self.duration_entry.get()
        date = self.date_entry.get()

        if not type_of_exercise or not duration or not date:
            messagebox.showwarning("Input Error", "All fields are required!")
            return

        try:
            duration = int(duration)
            datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            messagebox.showwarning("Input Error", "Invalid data format!")
            return

        self.app.activities.append((type_of_exercise, duration, date))
        messagebox.showinfo("Success", "Activity logged successfully!")
        self.root.destroy()

class ViewHistoryWindow:
    def __init__(self, root, app):
        self.root = root
        self.root.title("Activity History")
        self.app = app

        self.history_label = tk.Label(self.root, text="Your Activity History")
        self.history_label.pack(pady=5)

        self.history_text = tk.Text(self.root, height=10, width=50)
        self.history_text.pack(pady=5)

        self.back_button = tk.Button(self.root, text="Back", command=self.root.destroy)
        self.back_button.pack(pady=5)

        self.show_history()

    def show_history(self):
        self.history_text.delete(1.0, tk.END)
        for activity in self.app.activities:
            self.history_text.insert(tk.END, f"Type: {activity[0]}, Duration: {activity[1]} mins, Date: {activity[2]}\n")

class SetGoalsWindow:
    def __init__(self, root, app):
        self.root = root
        self.root.title("Set Fitness Goals")
        self.app = app

        self.goal_label = tk.Label(self.root, text="Set Your Fitness Goals")
        self.goal_label.pack(pady=5)

        self.desc_label = tk.Label(self.root, text="Goal Description")
        self.desc_label.pack(pady=5)

        self.desc_entry = tk.Entry(self.root)
        self.desc_entry.pack(pady=5)

        self.target_label = tk.Label(self.root, text="Target Duration (minutes)")
        self.target_label.pack(pady=5)

        self.target_entry = tk.Entry(self.root)
        self.target_entry.pack(pady=5)

        self.deadline_label = tk.Label(self.root, text="Deadline (YYYY-MM-DD)")
        self.deadline_label.pack(pady=5)

        self.deadline_entry = tk.Entry(self.root)
        self.deadline_entry.pack(pady=5)

        self.save_button = tk.Button(self.root, text="Save Goal", command=self.save_goal)
        self.save_button.pack(pady=5)

        self.cancel_button = tk.Button(self.root, text="Cancel", command=self.root.destroy)
        self.cancel_button.pack(pady=5)

    def save_goal(self):
        desc = self.desc_entry.get()
        target_duration = self.target_entry.get()
        deadline = self.deadline_entry.get()

        if not desc or not target_duration or not deadline:
            messagebox.showwarning("Input Error", "All fields are required!")
            return

        try:
            target_duration = int(target_duration)
            datetime.strptime(deadline, "%Y-%m-%d")
        except ValueError:
            messagebox.showwarning("Input Error", "Invalid data format!")
            return

        self.app.goals.append((desc, target_duration, deadline))
        messagebox.showinfo("Success", "Goal set successfully!")
        self.root.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = FitLifeTrackerApp(root)
    root.mainloop()
