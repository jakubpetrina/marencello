import http.server, os
os.chdir('/Users/jakubpetrina-macmini/marencello-landing')
http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler, port=3456)
