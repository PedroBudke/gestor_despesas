import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestoreDatabase, isFirebaseConfigured } from "@/services/firebase";
import type {
  IncomeEntry,
  IncomeEntryInput,
} from "@/services/income-entry-types";

const incomeEntriesCollectionName = "income_entries";

function getIncomeEntriesCollection() {
  const database = getFirestoreDatabase();

  if (!database) {
    throw new Error(
      "Firestore indisponível. Configure as variáveis NEXT_PUBLIC_FIREBASE_* para habilitar a persistência.",
    );
  }

  return collection(database, incomeEntriesCollectionName);
}

export async function createIncomeEntry(incomeEntry: IncomeEntryInput) {
  const incomeEntriesCollection = getIncomeEntriesCollection();

  await addDoc(incomeEntriesCollection, {
    title: incomeEntry.title,
    amount: incomeEntry.amount,
    source: incomeEntry.source,
    date: incomeEntry.date,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToIncomeEntries(
  onIncomeEntriesChange: (entries: IncomeEntry[]) => void,
) {
  if (!isFirebaseConfigured()) {
    onIncomeEntriesChange([]);
    return () => undefined;
  }

  try {
    const incomeEntriesCollection = getIncomeEntriesCollection();
    const incomeEntriesQuery = query(
      incomeEntriesCollection,
      orderBy("createdAt", "desc"),
    );

    return onSnapshot(
      incomeEntriesQuery,
      (snapshot) => {
        const entries = snapshot.docs.map((snapshotDocument) => {
          const data = snapshotDocument.data();

          return {
            amount: Number(data.amount ?? 0),
            date: String(data.date ?? ""),
            id: snapshotDocument.id,
            source: String(data.source ?? "Outros"),
            title: String(data.title ?? ""),
          };
        });

        onIncomeEntriesChange(entries);
      },
      () => {
        // Erros de conexão são tratados silenciosamente — dashboard continua com dados em cache
      },
    );
  } catch {
    onIncomeEntriesChange([]);
    return () => undefined;
  }
}
