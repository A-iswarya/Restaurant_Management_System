class CreateAdmins < ActiveRecord::Migration[7.0]
  def change
    create_table :admins, id: :uuid do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :email
      t.string :phone_number
      t.references :restaurant, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
