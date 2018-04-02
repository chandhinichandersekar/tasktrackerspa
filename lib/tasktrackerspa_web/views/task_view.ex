defmodule TasktrackerspaWeb.TaskView do
  use TasktrackerspaWeb, :view
  alias TasktrackerspaWeb.TaskView
  alias TasktrackerspaWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      body: task.body,
      assigned: task.assigned,
      completed: task.completed,
      time: task.time,
      title: task.title,
      user: render_one(task.user, UserView, "user.json")}
  end
end
