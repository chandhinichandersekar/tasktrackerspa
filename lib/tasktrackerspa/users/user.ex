defmodule Tasktrackerspa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :name, :string

    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :password])
    |> put_pass_hash()
    |> validate_required([:name])
  end
  #referred from Prof Nat Tucks nu_mart password validation https://github.com/NatTuck/nu_mart/blob/prep-1016/lib/nu_mart/accounts/user.ex
  def put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
      change(changeset, Comeonin.Argon2.add_hash(password))
    end
    def put_pass_hash(changeset), do: changeset


end
