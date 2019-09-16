module Api
  class FileVersionsController < ApiController
  skip_before_action :verify_authenticity_token

    def create 
      ok = []
      @task = Task.find(file_params[:task_id])
      file_params[:files].each do |f|
        @file = FileVersion.create()
        @file.file.attach(f)
        @task.file_versions << @file
        ok << url_for(@file.file)
      end

      render json: {success: ok} 
    end

    private

    def file_params
      params.permit(:task_id, files: [])
    end
  end
end
