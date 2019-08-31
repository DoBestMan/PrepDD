require 'rails_helper'

describe WelcomeController do
  describe 'Load React App' do
    it 'should load React app successfully' do
      get :index
      expect(response.status).to eq(200)
    end
  end
end
