using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketStation
{
    internal static class GlobalData
    {
        static GlobalData()
        {
            GQLClient = new GraphQLHttpClient(AppSettings.DataAPIURL, new NewtonsoftJsonSerializer());
        }
        public static GraphQLHttpClient GQLClient { get; }
    }
}
