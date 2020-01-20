using DatingApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options){}

        public DbSet<Value> Values { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Like> Likes { get; set; } // Likes is the name of the table you gonna create

    protected override void OnModelCreating(ModelBuilder builder) // overriding onMedelCreating method
    {
      builder.Entity<Like>() // like name of the model you gonna retrieve your propertis from
        .HasKey(k => new { k.LikerId, k.LikeeId }); // creating the the primary keys so that a user cant like one user more than one

      builder.Entity<Like>()
        .HasOne(u => u.Likee)  // one user has many likers
        .WithMany(u => u.Likers)
        .HasForeignKey(u => u.LikeeId)
        .OnDelete(DeleteBehavior.Restrict);

      builder.Entity<Like>() // one user can like many users
        .HasOne(u => u.Liker)
        .WithMany(u => u.Likees)
        .HasForeignKey(u => u.LikerId)
        .OnDelete(DeleteBehavior.Restrict);


    }






  }
}
