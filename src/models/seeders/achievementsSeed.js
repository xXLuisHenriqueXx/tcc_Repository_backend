require('dotenv').config();
const { connect } = require('../../config/database');
const Achievement = require('../Achievement');

const data = [
    {
        "title": "Primeira nota criada",
        "description": "Você criou sua primeira nota!",
        "requirement": "CREATED_NOTE_1",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1vikhCjR6wTtMRS-dffC38afEjnD6lRA9",
        "expGiven": 10
    },
    {
        "title": "Cinco notas criadas",
        "description": "Você criou cinco notas!",
        "requirement": "CREATED_NOTE_5",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=19bscAfeU8KOvRdRj0ZaUlkzFboS7iqA5",
        "expGiven": 20
    },
    {
        "title": "Dez notas criadas",
        "description": "Você criou dez notas!",
        "requirement": "CREATED_NOTE_10",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1WyGudnx5qNn3axrAzFctnVUHwaF-Q7GY",
        "expGiven": 30
    },
    {
        "title": "Vinte notas criadas",
        "description": "Você criou vinte notas!",
        "requirement": "CREATED_NOTE_20",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1SjeJbUnizebYyLntE-1u8Rw7IdTIDJ5J",
        "expGiven": 40
    },
    {
        "title": "Trinta notas criadas",
        "description": "Você criou trinta notas!",
        "requirement": "CREATED_NOTE_30",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1UhBaUfvZwEmaWC-MCqVuAUkB0fmFsQuu",
        "expGiven": 50
    },
    {
        "title": "Primeira nota atualizada",
        "description": "Você atualizou sua primeira nota!",
        "requirement": "UPDATED_NOTE_1",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=16S_IMLWbGQYsNrdW-ZI9NY-Z-2o9Y8BF",
        "expGiven": 10
    },
    {
        "title": "Cinco notas atualizadas",
        "description": "Você atualizou cinco notas!",
        "requirement": "UPDATED_NOTE_5",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1UH7mzFocW_3XaIGgAIZ8NDsha83tEAW-",
        "expGiven": 20
    },
    {
        "title": "Dez notas atualizadas",
        "description": "Você atualizou dez notas!",
        "requirement": "UPDATED_NOTE_10",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1BIsJixXVG0WGU7C09N05tcwL3tWt27dc",
        "expGiven": 30
    },
    {
        "title": "Vinte notas atualizadas",
        "description": "Você atualizou vinte notas!",
        "requirement": "UPDATED_NOTE_20",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1dGQ6eh-deBkUYPLjkpnjcST1eJnLkhiv",
        "expGiven": 40
    },
    {
        "title": "Trinta notas atualizadas",
        "description": "Você atualizou trinta notas!",
        "requirement": "UPDATED_NOTE_30",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1NbTFuckefaJHuitT44ErwTPALlaCAlJo",
        "expGiven": 50
    },
    {
        "title": "Primeira nota deletada",
        "description": "Você deletou sua primeira nota!",
        "requirement": "DELETED_NOTE_1",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1bShAYe-dBR-vPM93I_pMCEugJnNky4ME",
        "expGiven": 10
    },
    {
        "title": "Cinco notas deletadas",
        "description": "Você deletou cinco notas!",
        "requirement": "DELETED_NOTE_5",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1v5DMof8cSsqTaD-ILqse65hrdzrCQppC",
        "expGiven": 20
    },
    {
        "title": "Dez notas deletadas",
        "description": "Você deletou dez notas!",
        "requirement": "DELETED_NOTE_10",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1KMlnCHzW8rc4km8rWLZ1-jp16uoY_TKu",
        "expGiven": 30
    },
    {
        "title": "Vinte notas deletadas",
        "description": "Você deletou vinte notas!",
        "requirement": "DELETED_NOTE_20",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=14lbhLS2B1geb0caSWgiz-fen0wSWcIQh",
        "expGiven": 40
    },
    {
        "title": "Trinta notas deletadas",
        "description": "Você deletou trinta notas!",
        "requirement": "DELETED_NOTE_30",
        "type": "_note",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1KvxJo9s1qdxrube4cdnzYtc2zfkVweHT",
        "expGiven": 50
    },
    {
        "title": "Primeira lista de tarefas criada",
        "description": "Você criou sua primeira lista de tarefas!",
        "requirement": "CREATED_TODO_1",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1vikhCjR6wTtMRS-dffC38afEjnD6lRA9",
        "expGiven": 10
    },
    {
        "title": "Cinco listas de tarefas criadas",
        "description": "Você criou cinco listas de tarefas!",
        "requirement": "CREATED_TODO_5",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=19bscAfeU8KOvRdRj0ZaUlkzFboS7iqA5",
        "expGiven": 20
    },
    {
        "title": "Dez listas de tarefas criadas",
        "description": "Você criou dez listas de tarefas!",
        "requirement": "CREATED_TODO_10",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1WyGudnx5qNn3axrAzFctnVUHwaF-Q7GY",
        "expGiven": 30
    },
    {
        "title": "Vinte listas de tarefas criadas",
        "description": "Você criou vinte listas de tarefas!",
        "requirement": "CREATED_TODO_20",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1SjeJbUnizebYyLntE-1u8Rw7IdTIDJ5J",
        "expGiven": 40
    },
    {
        "title": "Trinta listas de tarefas criadas",
        "description": "Você criou trinta listas de tarefas!",
        "requirement": "CREATED_TODO_30",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1UhBaUfvZwEmaWC-MCqVuAUkB0fmFsQuu",
        "expGiven": 50
    },
    {
        "title": "Primeira lista de tarefas atualizada",
        "description": "Você atualizou sua primeira lista de tarefas!",
        "requirement": "UPDATED_TODO_1",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=16S_IMLWbGQYsNrdW-ZI9NY-Z-2o9Y8BF",
        "expGiven": 10
    },
    {
        "title": "Cinco listas de tarefas atualizadas",
        "description": "Você atualizou cinco listas de tarefas!",
        "requirement": "UPDATED_TODO_5",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1UH7mzFocW_3XaIGgAIZ8NDsha83tEAW-",
        "expGiven": 20
    },
    {
        "title": "Dez listas de tarefas atualizadas",
        "description": "Você atualizou dez listas de tarefas!",
        "requirement": "UPDATED_TODO_10",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1BIsJixXVG0WGU7C09N05tcwL3tWt27dc",
        "expGiven": 30
    },
    {
        "title": "Vinte listas de tarefas atualizadas",
        "description": "Você atualizou vinte listas de tarefas!",
        "requirement": "UPDATED_TODO_20",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1dGQ6eh-deBkUYPLjkpnjcST1eJnLkhiv",
        "expGiven": 40
    },
    {
        "title": "Trinta listas de tarefas atualizadas",
        "description": "Você atualizou trinta listas de tarefas!",
        "requirement": "UPDATED_TODO_30",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1NbTFuckefaJHuitT44ErwTPALlaCAlJo",
        "expGiven": 50
    },
    {
        "title": "Primeira lista de tarefas deletada",
        "description": "Você deletou sua primeira lista de tarefas!",
        "requirement": "DELETED_TODO_1",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1bShAYe-dBR-vPM93I_pMCEugJnNky4ME",
        "expGiven": 10
    },
    {
        "title": "Cinco listas de tarefas deletadas",
        "description": "Você deletou cinco listas de tarefas!",
        "requirement": "DELETED_TODO_5",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1v5DMof8cSsqTaD-ILqse65hrdzrCQppC",
        "expGiven": 20
    },
    {
        "title": "Dez listas de tarefas deletadas",
        "description": "Você deletou dez listas de tarefas!",
        "requirement": "DELETED_TODO_10",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1KMlnCHzW8rc4km8rWLZ1-jp16uoY_TKu",
        "expGiven": 30
    },
    {
        "title": "Vinte listas de tarefas deletadas",
        "description": "Você deletou vinte listas de tarefas!",
        "requirement": "DELETED_TODO_20",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=14lbhLS2B1geb0caSWgiz-fen0wSWcIQh",
        "expGiven": 40
    },
    {
        "title": "Trinta listas de tarefas deletadas",
        "description": "Você deletou trinta listas de tarefas!",
        "requirement": "DELETED_TODO_30",
        "type": "_todo",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1KvxJo9s1qdxrube4cdnzYtc2zfkVweHT",
        "expGiven": 50
    },
    {
        "title": "Primeira tarefa criada",
        "description": "Você criou sua primeira tarefa!",
        "requirement": "CREATED_TASK_1",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1vikhCjR6wTtMRS-dffC38afEjnD6lRA9",
        "expGiven": 10
    },
    {
        "title": "Cinco tarefas criadas",
        "description": "Você criou cinco tarefas!",
        "requirement": "CREATED_TASK_5",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=19bscAfeU8KOvRdRj0ZaUlkzFboS7iqA5",
        "expGiven": 20
    },
    {
        "title": "Dez tarefas criadas",
        "description": "Você criou dez tarefas!",
        "requirement": "CREATED_TASK_10",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1WyGudnx5qNn3axrAzFctnVUHwaF-Q7GY",
        "expGiven": 30
    },
    {
        "title": "Vinte tarefas criadas",
        "description": "Você criou vinte tarefas!",
        "requirement": "CREATED_TASK_20",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1SjeJbUnizebYyLntE-1u8Rw7IdTIDJ5J",
        "expGiven": 40
    },
    {
        "title": "Trinta tarefas criadas",
        "description": "Você criou trinta tarefas!",
        "requirement": "CREATED_TASK_30",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1UhBaUfvZwEmaWC-MCqVuAUkB0fmFsQuu",
        "expGiven": 50
    },
    {
        "title": "Primeira tarefa atualizada",
        "description": "Você atualizou sua primeira tarefa!",
        "requirement": "UPDATED_TASK_1",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=16S_IMLWbGQYsNrdW-ZI9NY-Z-2o9Y8BF",
        "expGiven": 10
    },
    {
        "title": "Cinco tarefas atualizadas",
        "description": "Você atualizou cinco tarefas!",
        "requirement": "UPDATED_TASK_5",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1UH7mzFocW_3XaIGgAIZ8NDsha83tEAW-",
        "expGiven": 20
    },
    {
        "title": "Dez tarefas atualizadas",
        "description": "Você atualizou dez tarefas!",
        "requirement": "UPDATED_TASK_10",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1BIsJixXVG0WGU7C09N05tcwL3tWt27dc",
        "expGiven": 30
    },
    {
        "title": "Vinte tarefas atualizadas",
        "description": "Você atualizou vinte tarefas!",
        "requirement": "UPDATED_TASK_20",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1dGQ6eh-deBkUYPLjkpnjcST1eJnLkhiv",
        "expGiven": 40
    },
    {
        "title": "Trinta tarefas atualizadas",
        "description": "Você atualizou trinta tarefas!",
        "requirement": "UPDATED_TASK_30",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1NbTFuckefaJHuitT44ErwTPALlaCAlJo",
        "expGiven": 50
    },
    {
        "title": "Primeira tarefa deletada",
        "description": "Você deletou sua primeira tarefa!",
        "requirement": "DELETED_TASK_1",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1bShAYe-dBR-vPM93I_pMCEugJnNky4ME",
        "expGiven": 10
    },
    {
        "title": "Cinco tarefas deletadas",
        "description": "Você deletou cinco tarefas!",
        "requirement": "DELETED_TASK_5",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1v5DMof8cSsqTaD-ILqse65hrdzrCQppC",
        "expGiven": 20
    },
    {
        "title": "Dez tarefas deletadas",
        "description": "Você deletou dez tarefas!",
        "requirement": "DELETED_TASK_10",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1KMlnCHzW8rc4km8rWLZ1-jp16uoY_TKu",
        "expGiven": 30
    },
    {
        "title": "Vinte tarefas deletadas",
        "description": "Você deletou vinte tarefas!",
        "requirement": "DELETED_TASK_20",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=14lbhLS2B1geb0caSWgiz-fen0wSWcIQh",
        "expGiven": 40
    },
    {
        "title": "Trinta tarefas deletadas",
        "description": "Você deletou trinta tarefas!",
        "requirement": "DELETED_TASK_30",
        "type": "_task",
        "imageUrl": "https://drive.google.com/uc?export=view&id=1KvxJo9s1qdxrube4cdnzYtc2zfkVweHT",
        "expGiven": 50
    }
]

const connection = connect();

const saveAchievementsNotes = async () => {
    
    await connection.models.Achievement.deleteMany({ type: '_note' });
    await connection.models.Achievement.deleteMany({ type: '_todo' });
    await connection.models.Achievement.deleteMany({ type: '_task' });
    
    await Achievement.insertMany(data);
}

saveAchievementsNotes();