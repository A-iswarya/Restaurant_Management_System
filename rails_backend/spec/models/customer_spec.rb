# == Schema Information
#
# Table name: customers
#
#  id              :uuid             not null, primary key
#  email           :string
#  name            :string
#  password_digest :string           not null
#  phone_number    :string
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  table_id        :uuid
#
# Indexes
#
#  index_customers_on_table_id  (table_id)
#
# Foreign Keys
#
#  fk_rails_...  (table_id => tables.id)
#
require 'rails_helper'

RSpec.describe Customer, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
