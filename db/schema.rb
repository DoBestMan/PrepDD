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

ActiveRecord::Schema.define(version: 2019_07_17_200930) do
  create_table 'companies', force: :cascade do |t|
    t.string 'name'
    t.bigint 'parent_id'
    t.bigint 'broker_co_id'
    t.bigint 'subscription_id'
    t.boolean 'is_active'
    t.string 'encryption_key'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'owner_id'
    t.index %w[owner_id], name: 'index_companies_on_owner_id'
  end

  create_table 'data_migrations',
               primary_key: 'version', id: :string, force: :cascade do |t|
  end

  create_table 'roles', force: :cascade do |t|
    t.string 'title'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'roles_users', force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'role_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[role_id], name: 'index_roles_users_on_role_id'
    t.index %w[user_id], name: 'index_roles_users_on_user_id'
  end

  create_table 'teams', force: :cascade do |t|
    t.string 'name'
    t.boolean 'is_active', default: true
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'teams_users', force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'team_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[team_id], name: 'index_teams_users_on_team_id'
    t.index %w[user_id], name: 'index_teams_users_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'full_name', default: '', null: false
    t.string 'display_name', default: '', null: false
    t.integer 'company_id'
    t.string 'uuid'
    t.string 'token_id'
    t.string 'social_login_provider'
    t.integer 'notification_id'
    t.integer 'notification_scope'
    t.integer 'notification_frequency'
    t.datetime 'notification_time'
    t.datetime 'notification_day'
    t.integer 'active_state_id'
    t.string 'user_token'
    t.string 'bio'
    t.index %w[company_id], name: 'index_users_on_company_id'
    t.index %w[email], name: 'index_users_on_email', unique: true
    t.index %w[notification_id], name: 'index_users_on_notification_id'
    t.index %w[reset_password_token],
            name: 'index_users_on_reset_password_token', unique: true
  end
end
