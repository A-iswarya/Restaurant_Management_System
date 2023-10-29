class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations, id: :uuid do |t|
      t.datetime :time
      t.references :customer, null: false, foreign_key: true, type: :uuid
      t.references :table, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
