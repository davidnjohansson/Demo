﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using API.Data.Import;
using API.Data.Import.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;

#nullable disable

namespace API.Data.Import.Configurations
{
    public partial class VALIDERING_VERKSAMHETERConfiguration : IEntityTypeConfiguration<VALIDERING_VERKSAMHETER>
    {
        public void Configure(EntityTypeBuilder<VALIDERING_VERKSAMHETER> entity)
        {
            entity.HasKey(e => e.PK);

            entity.HasOne(d => d.FK_VALIDERINGNavigation)
                .WithMany(p => p.VALIDERING_VERKSAMHETER)
                .HasForeignKey(d => d.FK_VALIDERING)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VALIDERING_VERKSAMHETER_VALIDERING");

            entity.HasOne(d => d.FK_VERKSAMHETERNavigation)
                .WithMany(p => p.VALIDERING_VERKSAMHETER)
                .HasForeignKey(d => d.FK_VERKSAMHETER)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VALIDERING_VERKSAMHETER_VERKSAMHETER");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<VALIDERING_VERKSAMHETER> entity);
    }
}
