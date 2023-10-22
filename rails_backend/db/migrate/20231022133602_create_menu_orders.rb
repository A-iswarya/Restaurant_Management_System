class CreateMenuOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :menu_orders, id: :uuid do |t|
      t.references :menu, null: false, foreign_key: true, type: :uuid
      t.references :order, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
