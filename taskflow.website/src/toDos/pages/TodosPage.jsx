import PageLayout from '../../common/PageLayout';
import { useToDos } from '../../hooks/useToDos';
import Spinner from '../../common/Spinner';
import ToDoCreate from '../components/ToDoCreate/ToDoCreate';
import ToDoSelectors from '../components/ToDoSelectors/ToDoSelectors';
import ToDoStatsCards from '../components/ToDoStatsCards/ToDoStatsCards';
import ToDoList from '../components/ToDoList/ToDoList';

/**
 * Page principale des ToDos
 * Affiche la liste des tâches avec tous les composants
 */
const TodosPage = () => {
    const { loading } = useToDos();

    return (
        <PageLayout>
            <div className="space-y-6">
                {/* Formulaire de création */}
                <ToDoCreate />

                {/* Statistiques */}
                <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-700/50 min-h-[140px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-24">
                                <Spinner size="md" />
                            </div>
                        ) : (
                            <ToDoStatsCards />
                        )}
                    </div>

                    {/* Filtres et tri */}
                    <div className="px-6 py-4 border-b border-slate-700/50">
                        <ToDoSelectors />
                    </div>

                    {/* Liste des tâches */}
                    <div className="p-6 min-h-[300px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-48">
                                <Spinner size="lg" />
                            </div>
                        ) : (
                            <ToDoList />
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default TodosPage;
