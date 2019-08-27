class Api::CompaniesController < ApiController
  skip_before_action :verify_authenticity_token
  before_action :set_company, only: %i[update_log]

  def update_log
    logo = params[:logo]
    if logo.content_type.in?(%['image/jpeg image/jpg image/png'])
      @company.logo.attach(params[:logo])
      render json: { status: true, logo_url: url_for(@company.logo) }
    else
      render json: { status: false, message: 'Not a valid file type' }
    end
  end

  private

  def set_company
    @company = Company.find(company_params[:id])
  end

  def company_params
    params.permit(:id, logo: [])
  end
end
