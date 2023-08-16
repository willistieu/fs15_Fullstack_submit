using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public static class UserRepository
    {
        public static List<User> UserList(FsDB db)
        {
            var _users = db.users;
            return _users.ToList();
        }
        public static User? GetUserById(int id, FsDB db)
        {
            try
            {
                User? _user = db.users.FirstOrDefault(u => u.Id == id);
                return _user;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }

        public static void PostAUser(User user, FsDB db)
        {
            try
            {
                if (user.Id <= 0)
                {
                    db.users.AddAsync(user);
                    db.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {

                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }

        public static void DeleteUser(int id, FsDB db)
        {
            try
            {
                User? _user = db.users.FirstOrDefault(u => u.Id == id);
                if (_user is not null)
                {
                    db.users.Remove(_user);
                    db.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }
        public static User? PutAuser(int id, User inputUser, FsDB db) {
            try
            {
                User? _user = db.users.FirstOrDefault(u => u.Id == id);
                if (_user is not null)
                {
                    _user.Name = inputUser.Name;
                    _user.Email = inputUser.Email;
                    _user.Password = inputUser.Password;
                    _user.Username = inputUser.Username;
                    _user.Role = inputUser.Role;
                    _user.EditedBy = inputUser.EditedBy;
                }
                Console.WriteLine(_user);
                db.SaveChangesAsync();
                return _user;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }
    }
}
