# == Schema Information
#
# Table name: orders
#
#  id         :uuid             not null, primary key
#  status     :integer          default("placed")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  staff_id   :uuid             not null
#
# Indexes
#
#  index_orders_on_staff_id  (staff_id)
#
# Foreign Keys
#
#  fk_rails_...  (staff_id => staffs.id)
#
require 'rails_helper'

RSpec.describe Order, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
