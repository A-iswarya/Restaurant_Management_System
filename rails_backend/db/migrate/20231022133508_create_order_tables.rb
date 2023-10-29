class CreateOrderTables < ActiveRecord::Migration[7.0]
  def change
    create_table :order_tables, id: :uuid do |t|
      t.references :order, null: false, foreign_key: true, type: :uuid
      t.references :table, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
