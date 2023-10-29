# == Schema Information
#
# Table name: order_tables
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  order_id   :uuid             not null
#  table_id   :uuid             not null
#
# Indexes
#
#  index_order_tables_on_order_id  (order_id)
#  index_order_tables_on_table_id  (table_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#  fk_rails_...  (table_id => tables.id)
#
require 'rails_helper'

RSpec.describe OrderTable, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
