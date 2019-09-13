# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_11_184105) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "broker_companies", force: :cascade do |t|
    t.bigint "child_broker_id"
    t.bigint "parent_broker_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["child_broker_id"], name: "index_broker_companies_on_child_broker_id"
    t.index ["parent_broker_id"], name: "index_broker_companies_on_parent_broker_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.bigint "parent_id"
    t.bigint "broker_co_id"
    t.bigint "subscription_id"
    t.boolean "is_active"
    t.string "encryption_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "owner_id"
    t.string "s3_location"
    t.string "kms_key_id"
    t.string "kms_key"
    t.boolean "auto_pdf", default: false
    t.boolean "auto_watermark", default: false
    t.boolean "preview_only", default: false
    t.index ["owner_id"], name: "index_companies_on_owner_id"
  end

  create_table "data_migrations", primary_key: "version", id: :string, force: :cascade do |t|
  end

  create_table "lists", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.boolean "is_active", default: true
    t.boolean "is_template"
    t.boolean "is_public_template"
    t.bigint "requester_id"
    t.bigint "responder_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "requester_rank"
    t.integer "responder_rank"
    t.index ["requester_id"], name: "index_lists_on_requester_id"
    t.index ["responder_id"], name: "index_lists_on_responder_id"
  end

  create_table "lists_users", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "list_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "team_id"
    t.index ["list_id"], name: "index_lists_users_on_list_id"
    t.index ["team_id"], name: "index_lists_users_on_team_id"
    t.index ["user_id"], name: "index_lists_users_on_user_id"
  end

  create_table "parent_companies", force: :cascade do |t|
    t.bigint "child_company_id"
    t.bigint "parent_company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["child_company_id"], name: "index_parent_companies_on_child_company_id"
    t.index ["parent_company_id"], name: "index_parent_companies_on_parent_company_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles_users", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "company_id"
    t.index ["company_id"], name: "index_roles_users_on_company_id"
    t.index ["role_id"], name: "index_roles_users_on_role_id"
    t.index ["user_id"], name: "index_roles_users_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "session_id", null: false
    t.text "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true
    t.index ["updated_at"], name: "index_sessions_on_updated_at"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.string "description"
    t.integer "max_users"
    t.integer "max_storage"
    t.integer "additional_storage"
    t.boolean "auto_pdf"
    t.boolean "auto_watermark"
    t.boolean "modify_subscription"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "task_message_alerts", force: :cascade do |t|
    t.bigint "task_message_id"
    t.bigint "user_id"
    t.boolean "is_read", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_message_id"], name: "index_task_message_alerts_on_task_message_id"
    t.index ["user_id"], name: "index_task_message_alerts_on_user_id"
  end

  create_table "task_messages", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "task_id"
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_task_messages_on_task_id"
    t.index ["user_id"], name: "index_task_messages_on_user_id"
  end

  create_table "task_owners", force: :cascade do |t|
    t.bigint "task_id"
    t.string "task_ownerable_type"
    t.bigint "task_ownerable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "owner_type"
    t.index ["task_id"], name: "index_task_owners_on_task_id"
    t.index ["task_ownerable_type", "task_ownerable_id"], name: "index_task_owners_on_task_ownerable_type_and_task_ownerable_id"
  end

  create_table "task_sections", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "priority", default: 0
    t.integer "status", default: 0
    t.datetime "due_date"
    t.boolean "is_active"
    t.bigint "list_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "task_section_id"
    t.index ["list_id"], name: "index_tasks_on_list_id"
    t.index ["task_section_id"], name: "index_tasks_on_task_section_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.boolean "is_active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "company_id"
    t.index ["company_id"], name: "index_teams_on_company_id"
  end

  create_table "teams_users", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_teams_users_on_team_id"
    t.index ["user_id"], name: "index_teams_users_on_user_id"
  end

  create_table "user_notification_frequencies", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_notification_scopes", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "full_name", default: "", null: false
    t.string "display_name", default: "", null: false
    t.bigint "company_id"
    t.string "uuid"
    t.string "token_id"
    t.string "social_login_provider"
    t.bigint "notification_id"
    t.integer "notification_scope"
    t.integer "notification_frequency"
    t.datetime "notification_time"
    t.datetime "notification_day"
    t.integer "active_state_id"
    t.string "user_token"
    t.string "bio"
    t.bigint "last_viewed_company_id"
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["notification_id"], name: "index_users_on_notification_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_companies", force: :cascade do |t|
    t.bigint "company_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_users_companies_on_company_id"
    t.index ["user_id"], name: "index_users_companies_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
