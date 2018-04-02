defmodule Tasktrackerspa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :assigned, :string
    field :body, :string
    field :completed, :boolean, default: false
    field :time, :integer
    field :title, :string
    #field :user_id, :id
    belongs_to :user, Tasktrackerspa.Users.User
    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:body, :assigned, :completed, :title, :user_id])
    |> validate_required([:body, :assigned, :completed,  :title, :user_id])
  end
end
