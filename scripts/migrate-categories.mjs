#!/usr/bin/env node

/**
 * ─────────────────────────────────────────────────────────────────────
 *  House of Anna — Firestore Gallery Category Migration
 * ─────────────────────────────────────────────────────────────────────
 *
 *  Migrates gallery documents from the OLD category taxonomy:
 *    crepe, vintage, silk, ankara, corporate
 *
 *  To the NEW category taxonomy:
 *    bespoke-gowns, blazers, ankara, corporate, bridal-wedding
 *
 *  Mapping:
 *    crepe    →  bespoke-gowns
 *    vintage  →  bridal-wedding
 *    silk     →  bespoke-gowns
 *    ankara   →  ankara         (unchanged)
 *    corporate → corporate      (unchanged)
 *
 *  Usage:
 *    node scripts/migrate-categories.mjs              # Dry run (preview)
 *    node scripts/migrate-categories.mjs --commit     # Execute writes
 * ─────────────────────────────────────────────────────────────────────
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";

// ── Firebase Config (same as .env) ──────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyAT_qJEO7MhNiqD9ldq-ao0VfCv-3CLWeQ",
  authDomain: "house-of-anna.firebaseapp.com",
  projectId: "house-of-anna",
  storageBucket: "house-of-anna.firebasestorage.app",
  messagingSenderId: "969355625531",
  appId: "1:969355625531:web:63f0fb54c3ff4cb63d481e",
};

// ── Category Mapping ────────────────────────────────────────────────
const CATEGORY_MAP = {
  crepe: "bespoke-gowns",
  vintage: "bridal-wedding",
  silk: "bespoke-gowns",
  // ankara and corporate stay the same — no migration needed
};

// ── Main ────────────────────────────────────────────────────────────
const isDryRun = !process.argv.includes("--commit");

async function migrate() {
  console.log("\n╔═══════════════════════════════════════════════════╗");
  console.log("║  House of Anna — Category Migration Script       ║");
  console.log("╚═══════════════════════════════════════════════════╝\n");

  if (isDryRun) {
    console.log("🔍 Mode: DRY RUN (no writes will be made)");
    console.log("   To execute writes, run with: --commit\n");
  } else {
    console.log("🔥 Mode: LIVE — Writing changes to Firestore\n");
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // 1. Fetch all gallery documents
  const galleryRef = collection(db, "gallery");
  const snapshot = await getDocs(galleryRef);

  console.log(`📦 Found ${snapshot.size} documents in "gallery" collection.\n`);

  if (snapshot.empty) {
    console.log("✅ No documents found. Nothing to migrate.\n");
    process.exit(0);
  }

  // 2. Identify documents that need migration
  const toMigrate = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const oldCategory = data.category;

    if (CATEGORY_MAP[oldCategory]) {
      toMigrate.push({
        id: docSnap.id,
        title: data.title || "(untitled)",
        oldCategory,
        newCategory: CATEGORY_MAP[oldCategory],
      });
    }
  });

  if (toMigrate.length === 0) {
    console.log("✅ All documents already use the new categories. Nothing to do.\n");
    process.exit(0);
  }

  // 3. Print migration plan
  console.log(`🔄 ${toMigrate.length} document(s) need migration:\n`);
  console.log("   ┌──────────────────────────────────────────────────────────────────┐");
  console.log("   │  Title                              │  Old         →  New        │");
  console.log("   ├──────────────────────────────────────────────────────────────────┤");

  for (const item of toMigrate) {
    const title = item.title.substring(0, 35).padEnd(35);
    const old = item.oldCategory.padEnd(12);
    const nw = item.newCategory.padEnd(12);
    console.log(`   │  ${title} │  ${old} →  ${nw} │`);
  }

  console.log("   └──────────────────────────────────────────────────────────────────┘\n");

  // 4. Execute or skip based on mode
  if (isDryRun) {
    console.log("🛑 Dry run complete. No changes were made.");
    console.log("   Run with --commit to apply these changes.\n");
    process.exit(0);
  }

  // Firestore batched writes (max 500 per batch)
  const BATCH_SIZE = 500;
  let batchCount = 0;
  let batch = writeBatch(db);
  let opsInBatch = 0;

  for (const item of toMigrate) {
    const docRef = doc(db, "gallery", item.id);
    batch.update(docRef, { category: item.newCategory });
    opsInBatch++;

    if (opsInBatch >= BATCH_SIZE) {
      await batch.commit();
      batchCount++;
      console.log(`   ✓ Batch ${batchCount} committed (${opsInBatch} docs)`);
      batch = writeBatch(db);
      opsInBatch = 0;
    }
  }

  // Commit any remaining operations
  if (opsInBatch > 0) {
    await batch.commit();
    batchCount++;
    console.log(`   ✓ Batch ${batchCount} committed (${opsInBatch} docs)`);
  }

  console.log(`\n✅ Migration complete! ${toMigrate.length} document(s) updated across ${batchCount} batch(es).\n`);
}

migrate().catch((err) => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});
