class AddStatusToTable < ActiveRecord::Migration[7.0]
  def change
    add_column :tables, :status, :integer, default: 0
  end
end
