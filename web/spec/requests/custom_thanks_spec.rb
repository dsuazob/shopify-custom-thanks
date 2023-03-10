require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/custom_thanks", type: :request do
  
  # This should return the minimal set of attributes required to create a valid
  # CustomThank. As you add validations to CustomThank, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) do
    {
      'id' => '1',
      'message' => 'test',
      'emphasis' => 'normal',
    }
  end

  let(:invalid_attributes) do
    {
      'id' => 'a',
      'message' => '1',
      'emphasis' => 'normal',
    }
  end

  describe "GET /index" do
    it "renders a successful response" do
      custom_thank = CustomThank.new(valid_attributes)
      custom_thank.save
      get "/api/custom_thanks"
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      custom_thank = CustomThank.new(valid_attributes)
      custom_thank.save
      get "/api/custom_thanks/#{custom_thank.id}"
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new CustomThank" do
        expect {
          post "/api/custom_thanks", params: { custom_thank: valid_attributes }
        }.to change(CustomThank, :count).by(1)
      end
    end

    context "with invalid parameters" do
      it "does not create a new CustomThank" do
        expect {
          post "/api/custom_thanks", params: { custom_thank: invalid_attributes }
        }.to change(CustomThank, :count).by(0)
      end

    
      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post "/api/custom_thanks", params: { custom_thank: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) do    
        {
          'id' => '1',
          'message' => 'This is a new message',
          'emphasis' => 'bold',
        } 
      end

      it "updates the requested custom_thank" do
        custom_thank = CustomThank.create! valid_attributes
        patch "/api/custom_thanks/#{custom_thank.id}", params: { custom_thank: new_attributes }
        custom_thank.reload
        expect(response).to be_successful
      end
    end

    context "with invalid parameters" do
    
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        custom_thank = CustomThank.create! valid_attributes
        patch "/api/custom_thanks/#{custom_thank.id}", params: { custom_thank: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested custom_thank" do
      custom_thank = CustomThank.create! valid_attributes
      expect {
        delete "/api/custom_thanks/#{custom_thank.id}"
      }.to change(CustomThank, :count).by(-1)
    end
  end
end
