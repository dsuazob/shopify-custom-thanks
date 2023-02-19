class CustomThanksController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_custom_thank, only: %i[ show update destroy ]

  # GET /custom_thanks or /custom_thanks.json
  def index
    @custom_thanks = CustomThank.all.reverse()
    render json: @custom_thanks
  end

  # GET /custom_thanks/1 or /custom_thanks/1.json
  def show
    render json: @custom_thank
  end

  # POST /custom_thanks or /custom_thanks.json
  def create
    @custom_thank = CustomThank.new(custom_thank_params)

    if @custom_thank.save
      render json: @custom_thank, status: :created
    else
      render json: @custom_thank.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /custom_thanks/1 or /custom_thanks/1.json
  def update
    if @custom_thank.update(custom_thank_params)
      render json: @custom_thank
    else
      render json: @custom_thank.errors, status: :unprocessable_entity
    end
  end

  # DELETE /custom_thanks/1 or /custom_thanks/1.json
  def destroy
    @custom_thank.destroy

    render json: @custom_thank, notice: "Custom thank was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_custom_thank
      @custom_thank = CustomThank.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def custom_thank_params
      params.require(:custom_thank).permit(:message, :emphasis)
    end
end
