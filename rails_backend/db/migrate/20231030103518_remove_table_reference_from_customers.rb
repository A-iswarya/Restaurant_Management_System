class RemoveTableReferenceFromCustomers < ActiveRecord::Migration[7.0]
  def change
    # Remove the foreign key constraint
    remove_foreign_key :customers, :tables

    # Remove the "table_id" column
    remove_column :customers, :table_id, :uuid
  end
end
