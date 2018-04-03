#referred from prof Nat Tuck's lecture on Redux http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
defmodule TasktrackerspaWeb.TokenController do
  use TasktrackerspaWeb, :controller
  alias Tasktrackerspa.Users.User

  action_fallback TasktrackerspaWeb.FallbackController

  def create(conn, %{"name" => name, "pass" => pass}) do
    #user_pass = Map.get(user_params, "pass")
    IO.inspect pass
    #hashed_pass = Comeonin.Argon2.hashpwsalt(pass)
    #user_params = Map.replace!(user_params, "pass", hashed_pass)

    #IO.inspect user_pass
    #IO.inspect hashed_pass
    #IO.inspect user_params
    with {:ok, %User{} = user} <- Tasktrackerspa.Users.get_and_auth_user(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
