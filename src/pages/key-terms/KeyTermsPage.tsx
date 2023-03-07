import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonToolbar, useIonRouter } from '@ionic/react';
import { Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react';
import { chatbubbles, ellipsisHorizontal } from 'ionicons/icons'
import { LanguageModel, TermModel } from './KeyTermsDataModels';
import AddNewTermModal from './AddNewTermModal';
import AddNewDefinitionModal from './AddNewDefinition';
import './KeyTermsPage.css';
import { CommonService } from '../../services/common.service';


//#region functions
const getId = () => {
    return CommonService.getRandomNum(4)
}
//#endregion

//#region interfaces
interface IState {
    languages: LanguageModel[],
    terms: TermModel[],
    isTermModalOpen: boolean,
    isDefinitionModalOpen: boolean
}
//#endregion

//#region data
const defaultState: IState = {
    languages: [{ id: getId(), title: 'Ethnologue' }, { id: getId(), title: 'ISO' }, { id: getId(), title: 'Glottolog' }],
    terms: [],
    isTermModalOpen: false,
    isDefinitionModalOpen: false
}
//#endregion

const KeyTermsPage: React.FC = () => {

    const [state, setState] = useState<IState>({ ...defaultState })
    const refCurTerm = useRef<string | number>()
    const router = useIonRouter()

    const updateState = (newState: Partial<IState>) => {
        setState((prevState) => {
            return { ...prevState, ...newState }
        })
    }

    const onTermModalDismiss = (value?: string, isCancelled?: boolean) => {
        const newState: Partial<IState> = { isTermModalOpen: false };
        if (!isCancelled && value) {
            newState.terms = [...state.terms]
            newState.terms.push({ id: getId(), term: value, definitions: [] })
        }
        updateState(newState);
    }

    const onDefinitionModalDismiss = (value?: string, isCancelled?: boolean) => {
        const newState: Partial<IState> = { isDefinitionModalOpen: false, terms: [...state.terms] }
        const curTerm = newState.terms?.find(t => t.id === refCurTerm.current)
        if (!isCancelled && value && curTerm) {
            curTerm.definitions.push({ id: getId(), definition: value, termId: refCurTerm.current! })
        }
        updateState(newState);
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <Typography variant='h6'>CPG</Typography>
                    <IonButtons slot='end'>
                        <IonButton color={'medium'}>
                            <IonIcon icon={ellipsisHorizontal}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonList className='form-control-rows'>
                    <IonItem className='ion-no-padding' lines='none'>
                        <IonSelect placeholder="Select Language" className='bordered-form-field full-width'>
                            {
                                state.languages.map((lang, idx) => <IonSelectOption key={idx} value={lang.id}>{lang.title}</IonSelectOption>)
                            }
                        </IonSelect>
                    </IonItem>
                    <IonItem className='ion-no-padding no-margin' lines='none'>
                        <IonLabel>Language ID</IonLabel>
                        <IonInput type={'text'} className='bordered-form-field' ></IonInput>
                    </IonItem>
                    <IonItem lines='none' className='ion-no-padding'>
                        <IonButton slot='end' onClick={() => { updateState({ isTermModalOpen: true }) }} className='no-mr'>Add New Term</IonButton>
                    </IonItem>
                    <IonItem lines='none' className='ion-no-padding'>
                        <Stack direction={'column'} className={'full-width'}>
                            {
                                state.terms.map((term, tIdx) => {
                                    return (
                                        <Stack key={tIdx} direction={'row'} className="phrase-box">
                                            <Stack flex={0.5} direction={'row'} flexWrap={'wrap'}>
                                                {term.term}
                                                <IonIcon onClick={() => {
                                                    router.push(`discussion`)
                                                }} icon={chatbubbles} size={'small'} color={'primary'} className={'ml-1'}></IonIcon>
                                            </Stack>
                                            <Stack flex={1} direction={'column'}>
                                                {
                                                    term.definitions.map((definition, dIdx) => {
                                                        return (
                                                            <Stack key={dIdx} direction={'row'} className='def-item' alignItems={'center'}>
                                                                {/* <IonIcon icon={disc} color={'dark'} size={'small'} className='mr-1' /> */}
                                                                <span className='dot'>&#x2022;</span>
                                                                <Stack direction={'row'} flexWrap={'wrap'}>
                                                                    {definition.definition}
                                                                    <IonIcon onClick={() => {
                                                                        router.push(`discussion`)
                                                                    }} icon={chatbubbles} size={'small'} color={'primary'} className={'ml-1'}></IonIcon>
                                                                </Stack>
                                                            </Stack>
                                                        )
                                                    })
                                                }
                                                <Stack direction={'row'} className='mt-1'>
                                                    <IonButton slot='end' size='small' onClick={() => {
                                                        refCurTerm.current = term.id
                                                        updateState({ isDefinitionModalOpen: true })
                                                    }}>Add New Definition</IonButton>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    )
                                })
                            }
                        </Stack>
                    </IonItem>
                </IonList>
                <AddNewTermModal isOpen={state.isTermModalOpen} onDismiss={onTermModalDismiss} />
                <AddNewDefinitionModal isOpen={state.isDefinitionModalOpen} onDismiss={onDefinitionModalDismiss} />
            </IonContent>
        </IonPage >
    );
};

export default KeyTermsPage;
