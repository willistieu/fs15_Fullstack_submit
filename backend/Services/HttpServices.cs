namespace backend.Services
{
    public class HttpServices
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public HttpServices ( IHttpContextAccessor httpContextAccessor)
        {
            _contextAccessor = httpContextAccessor;
        }
    }
}
