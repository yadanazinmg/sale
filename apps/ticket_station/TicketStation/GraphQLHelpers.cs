using GraphQL;
using GraphQL.Client.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketStation.Models;

namespace TicketStation
{
    internal static class GraphQLHelpers
    {
        public static async Task<List<User>> GetUsers()
        {
            var gqlRequest = new GraphQLRequest
            {
                Query = @"query Query($where: UserWhereInput) {
                  users(where: $where) {
                    id
                    name
                    role
                  }
                }",
                //OperationName = "users",
                Variables = new
                {
                    where = new
                    {
                        role = new
                        {
                            equals = "ENTRY_OPERATOR"
                        },
                        active = new
                        {
                            equals = true
                        }
                    },
                    orderBy = new[] {
                        new
                        {
                            name = "asc"
                        }
                    }
                }
            };
            var response = await GlobalData.GQLClient.SendQueryAsync<GetUserResponseType>(gqlRequest);
            var users = response.Data.Users;
            return users;
        }

        public static async Task<User?> Login(string username, string password)
        {
            var gqlRequest = new GraphQLRequest
            {
                Query = @"mutation Mutation($name: String!, $pwd: String!) {
                  signIn(name: $name, pwd: $pwd) {
                    accessToken
                    user {
                      id
                      name
                      role
                    }
                  }
                }",
                Variables = new
                {
                    name = username,
                    pwd = password
                }
            };
            var response = await GlobalData.GQLClient.SendQueryAsync<SignInResponseType>(gqlRequest);
            var user = response.Data.SignIn?.User;
            return user;
        }

        public static async Task<List<TicketType>> GetTicketTypes()
        {
            var gqlRequest = new GraphQLRequest
            {
                Query = @"query Query($orderBy: [TicketTypeOrderByWithRelationInput!]) {
                  ticketTypes(orderBy: $orderBy) {
                    id
                    name
                    duration_min
                    price
                  }
                }",
                Variables = new
                {
                    orderBy = new[] {
                        new {
                            duration_min = "asc"
                        }
                    }
                }
            };
            var response = await GlobalData.GQLClient.SendQueryAsync<TicketTypeResponseType>(gqlRequest);
            var ticketTypes = response.Data.TicketTypes;
            return ticketTypes;
        }

        public static async Task<int> SaveTicket(List<TicketRecord> tickets)
        {

            var gqlRequest = new GraphQLRequest
            {
                Query = @"mutation Mutation($data: [TicketRecordCreateManyInput!]!) {
                  createManyTicketRecord(data: $data) {
                    count
                  }
                }",
                Variables = new { data = tickets.ToArray() }
            };
            var response = await GlobalData.GQLClient.SendQueryAsync<CreateTicketResponseType>(gqlRequest);
            var count = response.Data.Count;
            return count;
        }

        public static async Task<TicketRecord?> GetLastPurchasedTicket()
        {
            try
            {
                var gqlRequest = new GraphQLRequest
                {
                    Query = @"query Query($where: TicketRecordWhereInput, $orderBy: [TicketRecordOrderByWithRelationInput!], $take: Int) {
                  ticketRecords(where: $where, orderBy: $orderBy, take: $take) {
                    id
                    code
                    duration_min
                    group_ticket_code
                    created_at
                  }
                }",
                    Variables = new
                    {
                        where = new
                        {
                            ticket_station_id = new
                            {
                                equals = AppSettings.TicketStationId
                            },
                            created_at = new
                            {
                                gte = DateTime.Today
                            }

                            //AND = new[] {
                            //new {
                            //    ticket_station_id = new {
                            //        equals = AppSettings.TicketStationId
                            //    },
                            //    created_at = new {
                            //        gt = DateTime.Today
                            //    }
                            //},
                            //}
                        },
                        orderBy = new[] {
                        new {
                            created_at = "desc"
                        }
                    },
                        take = 1
                    }
                };
                var response = await GlobalData.GQLClient.SendQueryAsync<TicketRecordQueryResponseType>(gqlRequest);
                var ticketRecords = response.Data.TicketRecords;
                if (ticketRecords.Count > 0)
                    return ticketRecords[0];
                return null;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public static async Task<List<TicketRecord>> GetLastPurchasedTicketGroup(string groupTicketCode)
        {

            var gqlRequest = new GraphQLRequest
            {
                Query = @"query TicketRecords($where: TicketRecordWhereInput, $orderBy: [TicketRecordOrderByWithRelationInput!]) {
                  ticketRecords(where: $where, orderBy: $orderBy) {
                    id
                    code
                    duration_min
                    created_at
                  }
                }",
                Variables = new
                {
                    where = new
                    {
                        ticket_station_id = new
                        {
                            equals = AppSettings.TicketStationId
                        },
                        created_at = new
                        {
                            gte = DateTime.Today
                        },
                        group_ticket_code = new
                        {
                            equals = groupTicketCode
                        }
                        //AND = new[] {
                        //    new {
                        //        ticket_station_id = new {
                        //            equals = AppSettings.TicketStationId
                        //        },
                        //        group_ticket_code = new {
                        //            equals = groupTicketCode
                        //        },
                        //        created_at = new {
                        //            gt = DateTime.Today
                        //        }
                        //    }
                        //}
                    },
                    orderBy = new[] {
                        new {
                            created_at = "asc"
                        }
                    },
                }
            };
            var response = await GlobalData.GQLClient.SendQueryAsync<TicketRecordQueryResponseType>(gqlRequest);
            var ticketRecords = response.Data.TicketRecords;
            return ticketRecords;
        }
    }
}
