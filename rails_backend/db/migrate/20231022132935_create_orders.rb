class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders, id: :uuid do |t|
      t.integer :status, default: 0
      t.references :staff, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
