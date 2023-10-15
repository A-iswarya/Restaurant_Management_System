class CreateCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :customers, id: :uuid do |t|
      t.string :username, null: false
      t.string :name
      t.string :email
      t.string :phone_number
      t.string :password_digest, null: false
      t.references :table, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
