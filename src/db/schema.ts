import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, text, time, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// Enums
export const patientSexEnum = pgEnum("patient_sex", ["male", "female", "other"])
export const patientStatusEnum = pgEnum("patient_status", ["active", "inactive", "blocked"])
export const appointmentStatusEnum = pgEnum("appointment_status", ["scheduled", "confirmed", "cancelled", "completed", "no_show"])

// Users
export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

// Clinics
export const clinicsTable = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  website: text("website"),
  logoImageUrl: text("logo_image_url"),
  businessHoursStart: time("business_hours_start"),
  businessHoursEnd: time("business_hours_end"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

// Users to Clinics (Junction Table)
export const usersToClinicsTable = pgTable("users_to_clinics", {
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }).notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

// Doctors
export const doctorsTable = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  avatarImageUrl: text("avatar_image_url"),
  speciality: varchar("speciality", { length: 100 }).notNull(),
  professionalId: varchar("professional_id", { length: 50 }), // For medical license numbers
  avaliableFromWeekDay: integer("avaliable_from_week_day").notNull(),
  availableToWeekDay: integer("available_to_week_day").notNull(),
  avaliableFromTime: time("avaliable_from_time").notNull(),
  availableToTime: time("available_to_time").notNull(),
  appointmentDurationMinutes: integer("appointment_duration_minutes").notNull().default(30),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
}) 

// Patients
export const patientsTable = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  status: patientStatusEnum("status").notNull().default("active"),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  sex: patientSexEnum("sex").notNull(),
  dateOfBirth: timestamp("date_of_birth"),
  address: text("address"),
  emergencyContact: varchar("emergency_contact", { length: 255 }),
  emergencyPhone: varchar("emergency_phone", { length: 20 }),
  medicalHistory: text("medical_history"),
  allergies: text("allergies"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

// Appointments
export const appointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }).notNull(),
  patientId: uuid("patient_id").references(() => patientsTable.id, { onDelete: "cascade" }).notNull(),
  doctorId: uuid("doctor_id").references(() => doctorsTable.id, { onDelete: "cascade" }).notNull(),
  status: appointmentStatusEnum("status").notNull().default("scheduled"),
  date: timestamp("date").notNull(),
  notes: text("notes"),
  cancellationReason: text("cancellation_reason"),
  priceInCents: integer("price_in_cents").notNull(),
  isPaid: boolean("is_paid").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

// Relations
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  clinicsToUsers: many(usersToClinicsTable)
}))

export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({ 
  doctors: many(doctorsTable),
  patients: many(patientsTable),
  appointments: many(appointmentsTable),
  usersToClinics: many(usersToClinicsTable),
}))

export const usersToClinicsTableRelations = relations(usersToClinicsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [usersToClinicsTable.clinicId],
    references: [clinicsTable.id],
  }),
  user: one(usersTable, {
    fields: [usersToClinicsTable.userId],
    references: [usersTable.id],
  }),
}))

export const doctorsTableRelations = relations(doctorsTable, ({ many, one }) => ({
  clinic: one(clinicsTable, {
    fields: [doctorsTable.clinicId],
    references: [clinicsTable.id],
  }),
  appointments: many(appointmentsTable),
}))

export const patientsTableRelations = relations(patientsTable, ({ many, one }) => ({
  clinic: one(clinicsTable, {
    fields: [patientsTable.clinicId],
    references: [clinicsTable.id],
  }),
  appointments: many(appointmentsTable),
}))

export const appointmentsTableRelations = relations(appointmentsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [appointmentsTable.clinicId],
    references: [clinicsTable.id],
  }),
  patient: one(patientsTable, { 
    fields: [appointmentsTable.patientId],
    references: [patientsTable.id],
  }),
  doctor: one(doctorsTable, {
    fields: [appointmentsTable.doctorId],
    references: [doctorsTable.id],
  }),
}))