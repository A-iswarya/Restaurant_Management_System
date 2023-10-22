# == Schema Information
#
# Table name: orders
#
#  id         :uuid             not null, primary key
#  status     :integer          default(0)
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
class Order < ApplicationRecord
  belongs_to :staff
  enum status: %i[placed in_progress ready_for_pickup out_for_delivery delivered]
end
