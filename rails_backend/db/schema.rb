# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_29_140022) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "admins", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "email"
    t.string "phone_number"
    t.uuid "restaurant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurant_id"], name: "index_admins_on_restaurant_id"
  end

  create_table "customers", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "username", null: false
    t.string "name"
    t.string "email"
    t.string "phone_number"
    t.string "password_digest", null: false
    t.uuid "table_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["table_id"], name: "index_customers_on_table_id"
  end

  create_table "feedbacks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "text", null: false
    t.uuid "restaurant_id", null: false
    t.uuid "customer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_feedbacks_on_customer_id"
    t.index ["restaurant_id"], name: "index_feedbacks_on_restaurant_id"
  end

  create_table "menu_orders", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "quantity"
    t.uuid "menu_id", null: false
    t.uuid "order_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_id"], name: "index_menu_orders_on_menu_id"
    t.index ["order_id"], name: "index_menu_orders_on_order_id"
  end

  create_table "menus", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.integer "price"
    t.text "description"
    t.integer "cooking_time"
    t.uuid "restaurant_id", null: false
    t.uuid "staff_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurant_id"], name: "index_menus_on_restaurant_id"
    t.index ["staff_id"], name: "index_menus_on_staff_id"
  end

  create_table "order_tables", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "order_id", null: false
    t.uuid "table_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_tables_on_order_id"
    t.index ["table_id"], name: "index_order_tables_on_table_id"
  end

  create_table "orders", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "status", default: 0
    t.uuid "staff_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["staff_id"], name: "index_orders_on_staff_id"
  end

  create_table "restaurant_customers", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "restaurant_id", null: false
    t.uuid "customer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_restaurant_customers_on_customer_id"
    t.index ["restaurant_id"], name: "index_restaurant_customers_on_restaurant_id"
  end

  create_table "restaurants", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "city"
    t.string "email"
    t.string "phone_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "staffs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "username", null: false
    t.string "name", null: false
    t.string "email"
    t.string "phone_number"
    t.string "password_digest", null: false
    t.integer "designation", null: false
    t.uuid "restaurant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurant_id"], name: "index_staffs_on_restaurant_id"
  end

  create_table "tables", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "table_number"
    t.integer "no_of_seats"
    t.uuid "restaurant_id", null: false
    t.uuid "staff_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0
    t.index ["restaurant_id"], name: "index_tables_on_restaurant_id"
    t.index ["staff_id"], name: "index_tables_on_staff_id"
  end

  add_foreign_key "admins", "restaurants"
  add_foreign_key "customers", "tables"
  add_foreign_key "feedbacks", "customers"
  add_foreign_key "feedbacks", "restaurants"
  add_foreign_key "menu_orders", "menus"
  add_foreign_key "menu_orders", "orders"
  add_foreign_key "menus", "restaurants"
  add_foreign_key "menus", "staffs"
  add_foreign_key "order_tables", "orders"
  add_foreign_key "order_tables", "tables"
  add_foreign_key "orders", "staffs"
  add_foreign_key "restaurant_customers", "customers"
  add_foreign_key "restaurant_customers", "restaurants"
  add_foreign_key "staffs", "restaurants"
  add_foreign_key "tables", "restaurants"
  add_foreign_key "tables", "staffs"
end
