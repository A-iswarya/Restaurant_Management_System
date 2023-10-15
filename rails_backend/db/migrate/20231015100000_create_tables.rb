class CreateTables < ActiveRecord::Migration[7.0]
  def change
    create_table :tables, id: :uuid do |t|
      t.integer :table_number
      t.integer :no_of_seats
      t.references :restaurant, null: false, foreign_key: true, type: :uuid
      t.references :staff, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
