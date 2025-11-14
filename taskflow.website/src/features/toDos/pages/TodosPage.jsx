import PageLayout from '@common/navigation/PageLayout';
import PageContainer from '@common/layout/PageContainer';
import Section from '@common/surfaces/Section';
import SectionPanel from '@common/surfaces/SectionPanel';
import Divider from '@common/surfaces/Divider';
import LoadingWrapper from '@common/feedback/LoadingWrapper';
import { useToDos } from '@hooks/useToDos';
import ToDoCreate from '@features/toDos/components/ToDoCreate/ToDoCreate';
import ToDoSelectors from '@features/toDos/components/ToDoSelectors/ToDoSelectors';
import ToDoStatsCards from '@features/toDos/components/ToDoStatsCards/ToDoStatsCards';
import ToDoList from '@features/toDos/components/ToDoList/ToDoList';

const TodosPage = () => {
    const { loading } = useToDos();

    return (
        <PageLayout>
            <PageContainer>
                <ToDoCreate />

                <Section padding="none">
                    <SectionPanel>
                        <LoadingWrapper loading={loading}>
                            <ToDoStatsCards />
                        </LoadingWrapper>
                    </SectionPanel>

                    <Divider />

                    <SectionPanel>
                        <ToDoSelectors />
                    </SectionPanel>

                    <Divider />

                    <SectionPanel>
                        <LoadingWrapper loading={loading}>
                            <ToDoList />
                        </LoadingWrapper>
                    </SectionPanel>
                </Section>
            </PageContainer>
        </PageLayout>
    );
};

export default TodosPage;
