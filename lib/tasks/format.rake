namespace :format do
  task :write do
    DIRECTORIES = %w[app bin config db lib spec storage test].join(',')
    EXTENSIONS = %w[js rake rb ts tsx].join(',')

    Signal.trap("INT") { 
      exit
    }
    Signal.trap("TERM") {
      exit
    }

    files =
      Dir.glob("{#{DIRECTORIES}}/**/*.{#{EXTENSIONS}}").filter do |file|
        !file.include? '__generated__'
      end

    group_size = (files.size.to_f / Etc.nprocessors.to_f).ceil

    files.each_slice(group_size).map do |slice|
      spawn('./node_modules/.bin/prettier', '--write', *slice)
    end

    if Process.waitall.any? { |_pid, status| status.exitstatus != 0 }
      abort('Error: not all files could be formatted')
    end
  end
end
