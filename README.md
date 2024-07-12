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

        # Welcome label
        self.welcome_label = tk.Label(self.main_frame, text="Welcome to FitLife Tracker", font=("Arial", 16))
        self.welcome_label.pack(pady=10)

        # Sub-heading label
        self.track_label = tk.Label(self.main_frame, text="Track Your Fitness Journey", font=("Arial", 14))
        self.track_label.pack(pady=10)

        # Button to open Log Activity window
        self.log_activity_button = tk.Button(self.main_frame, text="Log Activity", command=self.open_log_activity)
        self.log_activity_button.pack(pady=5)

        # Button to open View History window
        self.view_history_button = tk.Button(self.main_frame, text="View History", command=self.open_view_history)
        self.view_history_button.pack(pady=5)

        # Button to open Set Goals window
        self.set_goals_button = tk.Button(self.main_frame, text="Set Goals", command=self.open_set_goals)
        self.set_goals_button.pack(pady=5)

        # Exit button to close the application
        self.exit_button = tk.Button(self.main_frame, text="Exit", command=self.root.quit)
        self.exit_button.pack(pady=5)

        # Lists to store activities and goals
        self.activities = []
        self.goals = []

    # Function to open Log Activity window
    def open_log_activity(self):
        self.new_window(LogActivityWindow)

    # Function to open View History window
    def open_view_history(self):
        self.new_window(ViewHistoryWindow)

    # Function to open Set Goals window
    def open_set_goals(self):
        self.new_window(SetGoalsWindow)

    # Helper function to create a new window
    def new_window(self, window_class):
        self.new = tk.Toplevel(self.root)
        window_class(self.new, self)

# Log Activity Window
class LogActivityWindow:
    def __init__(self, root, app):
        self.root = root
        self.root.title("Log Activity")
        self.app = app

        # Label and entry for type of exercise
        self.type_label = tk.Label(self.root, text="Type of Exercise")
        self.type_label.pack(pady=5)
        self.type_entry = tk.Entry(self.root)
        self.type_entry.pack(pady=5)

        # Label and entry for duration of exercise
        self.duration_label = tk.Label(self.root, text="Duration (minutes)")
        self.duration_label.pack(pady=5)
        self.duration_entry = tk.Entry(self.root)
        self.duration_entry.pack(pady=5)

        # Label and entry for date of exercise
        self.date_label = tk.Label(self.root, text="Date (YYYY-MM-DD)")
        self.date_label.pack(pady=5)
        self.date_entry = tk.Entry(self.root)
        self.date_entry.pack(pady=5)

        # Save button to save the activity
        self.save_button = tk.Button(self.root, text="Save", command=self.save_activity)
        self.save_button.pack(pady=5)

        # Cancel button to close the window without saving
        self.cancel_button = tk.Button(self.root, text="Cancel", command=self.root.destroy)
        self.cancel_button.pack(pady=5)

    # Function to save the activity
    def save_activity(self):
        type_of_exercise = self.type_entry.get()
        duration = self.duration_entry.get()
        date = self.date_entry.get()

        # Validate input
        if not type_of_exercise or not duration or not date:
            messagebox.showwarning("Input Error", "All fields are required!")
            return

        # Validate duration and date format
        try:
            duration = int(duration)
            datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            messagebox.showwarning("Input Error", "Invalid data format!")
            return

        # Add activity to the list and show success message
        self.app.activities.append((type_of_exercise, duration, date))
        messagebox.showinfo("Success", "Activity logged successfully!")
        self.root.destroy()

# View History Window
class ViewHistoryWindow:
    def __init__(self, root, app):
        self.root = root
        self.root.title("Activity History")
        self.app = app

        # Label for activity history
        self.history_label = tk.Label(self.root, text="Your Activity History")
        self.history_label.pack(pady=5)

        # Text area to display activities
        self.history_text = tk.Text(self.root, height=10, width=50)
        self.history_text.pack(pady=5)

        # Back button to close the window
        self.back_button = tk.Button(self.root, text="Back", command=self.root.destroy)
        self.back_button.pack(pady=5)

        # Show the activity history
        self.show_history()

    # Function to display the activity history
    def show_history(self):
        self.history_text.delete(1.0, tk.END)
        for activity in self.app.activities:
            self.history_text.insert(tk.END, f"Type: {activity[0]}, Duration: {activity[1]} mins, Date: {activity[2]}\n")

# Set Goals Window
class SetGoalsWindow:
    def __init__(self, root, app):
        self.root = root
        self.root.title("Set Fitness Goals")
        self.app = app

        # Label for setting fitness goals
        self.goal_label = tk.Label(self.root, text="Set Your Fitness Goals")
        self.goal_label.pack(pady=5)

        # Label and entry for goal description
        self.desc_label = tk.Label(self.root, text="Goal Description")
        self.desc_label.pack(pady=5)
        self.desc_entry = tk.Entry(self.root)
        self.desc_entry.pack(pady=5)

        # Label and entry for target duration
        self.target_label = tk.Label(self.root, text="Target Duration (minutes)")
        self.target_label.pack(pady=5)
        self.target_entry = tk.Entry(self.root)
        self.target_entry.pack(pady=5)

        # Label and entry for goal deadline
        self.deadline_label = tk.Label(self.root, text="Deadline (YYYY-MM-DD)")
        self.deadline_label.pack(pady=5)
        self.deadline_entry = tk.Entry(self.root)
        self.deadline_entry.pack(pady=5)

        # Save button to save the goal
        self.save_button = tk.Button(self.root, text="Save Goal", command=self.save_goal)
        self.save_button.pack(pady=5)

        # Cancel button to close the window without saving
        self.cancel_button = tk.Button(self.root, text="Cancel", command=self.root.destroy)
        self.cancel_button.pack(pady=5)

    # Function to save the goal
    def save_goal(self):
        desc = self.desc_entry.get()
        target_duration = self.target_entry.get()
        deadline = self.deadline_entry.get()

        # Validate input
        if not desc or not target_duration or not deadline:
            messagebox.showwarning("Input Error", "All fields are required!")
            return

        # Validate target duration and deadline format
        try:
            target_duration = int(target_duration)
            datetime.strptime(deadline, "%Y-%m-%d")
        except ValueError:
            messagebox.showwarning("Input Error", "Invalid data format!")
            return

        # Add goal to the list and show success message
        self.app.goals.append((desc, target_duration, deadline))
        messagebox.showinfo("Success", "Goal set successfully!")
        self.root.destroy()

# Main function to run the application
if __name__ == "__main__":
    root = tk.Tk()
    app = FitLifeTrackerApp(root)
    root.mainloop()
