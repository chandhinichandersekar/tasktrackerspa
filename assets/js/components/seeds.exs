# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktrackerspa.Repo.insert!(%Tasktrackerspa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
# referred from prof Nat Tuck's lecture on Redux http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html

defmodule Seeds do
  alias Tasktrackerspa.Repo
  alias Tasktrackerspa.Users.User
  alias Tasktrackerspa.Tasks.Task

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")



    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", password_hash: p })
    b = Repo.insert!(%User{ name: "bob", password_hash: p  })
    c = Repo.insert!(%User{ name: "carol", password_hash: p  })
    d = Repo.insert!(%User{ name: "dave", password_hash: p  })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, body: "Hi, I'm Alice", assigned: "Alice", time: 10, completed: false, title: "Alice Task" })
    Repo.insert!(%Task{ user_id: b.id, body: "Hi, I'm Bob", assigned: "Bob", time: 10, completed: false, title: "Bob Task" })
    Repo.insert!(%Task{ user_id: b.id, body: "Hi, I'm Bob Again", assigned: "Dave", time: 10, completed: false, title: "dave Task" })
    Repo.insert!(%Task{ user_id: c.id, body: "Hi, I'm Carol", assigned: "Carol", time: 10, completed: false, title: "Carol Task" })
    Repo.insert!(%Task{ user_id: d.id, body: "Hi, I'm Dave", assigned: "Dave", time: 10, completed: false, title: "Dave Task" })
  end
end

Seeds.run
