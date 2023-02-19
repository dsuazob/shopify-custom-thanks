require "rails_helper"

RSpec.describe CustomThanksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "api/custom_thanks").to route_to("custom_thanks#index")
    end

    it "routes to #show" do
      expect(get: "api/custom_thanks/1").to route_to("custom_thanks#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "api/custom_thanks").to route_to("custom_thanks#create")
    end

    it "routes to #update via PATCH" do
      expect(patch: "api/custom_thanks/1").to route_to("custom_thanks#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "api/custom_thanks/1").to route_to("custom_thanks#destroy", id: "1")
    end
  end
end
