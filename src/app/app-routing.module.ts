import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { ListProComponent } from './ComponentsProfesionnel/listPro/list-pro/list-pro.component';
import { ProfessionnelTypeDetailComponent } from './ComponentsProfesionnel/Details/professionnel-type-detail/professionnel-type-detail.component';
import { AddProComponent } from './ComponentsProfesionnel/AddPro/add-pro/add-pro.component';
import { UpdateProfessionnelTypeComponent } from './ComponentsProfesionnel/update/update-professionnel-type/update-professionnel-type.component';
import { EtatListComponent } from './ComponentEtat/add/etat-list/etat-list.component';
import { EtatDetailComponent } from './ComponentEtat/detail/etat-detail/etat-detail.component';
import { AjoutEtatComponent } from './ComponentEtat/ajout/ajout-etat/ajout-etat.component';
import { UpdateEtatComponent } from './ComponentEtat/update/update-etat/update-etat.component';
import { GouvernoratListComponent } from './ComponentGouvernorat/list/gouvernorat-list/gouvernorat-list.component';
import { ListNotificationMoyenComponent } from './ComponentNotificationMoyen/list/list-notification-moyen/list-notification-moyen.component';
import { NotificationMoyenDetailComponent } from './ComponentNotificationMoyen/detail/notification-moyen-detail/notification-moyen-detail.component';
import { JugementTypeListComponent } from './ComponentJugementType/list/jugement-type-list/jugement-type-list.component';
import { JugementTypeDetailsComponent } from './ComponentJugementType/details/jugement-type-details/jugement-type-details.component';
import { DocumentTypeLisComponent } from './ComponentDocumentType/list/document-type-lis/document-type-lis.component';
import { DocumentTypeDetailsComponent } from './ComponentDocumentType/details/document-type-details/document-type-details.component';
import { AddGouvernoratComponent } from './ComponentGouvernorat/ajout/add-gouvernorat/add-gouvernorat.component';
import { UpdateGouvernoratComponent } from './ComponentGouvernorat/update/update-gouvernorat/update-gouvernorat.component';
import { GouvernoratDetailComponent } from './ComponentGouvernorat/detail/gouvernorat-detail/gouvernorat-detail.component';
import { AddDocTypeComponent } from './ComponentDocumentType/add/add-doc-type/add-doc-type.component';
import { AddJugementTypeComponent } from './ComponentJugementType/add/add-jugement-type/add-jugement-type.component';
import { AddNotificationMoyenComponent } from './ComponentNotificationMoyen/add/add-notification-moyen/add-notification-moyen.component';
import { ContentieuxTypeListComponent } from './ComponentContentieuxType/list/contentieux-type-list/contentieux-type-list.component';
import { AddContentieuxTypeComponent } from './ComponentContentieuxType/ajout/add-contentieux-type/add-contentieux-type.component';
import { ContentieuxTypeDetailComponent } from './ComponentContentieuxType/detail/contentieux-type-detail/contentieux-type-detail.component';
import { ClientTypeListComponent } from './ComponentClientType/list/client-type-list/client-type-list.component';
import { TribunalTypeListComponentComponent } from './Components/list/tribunal-type-list-component/tribunal-type-list-component.component';
import { TribunalTypeAddComponent } from './Components/ajout/tribunal-type-add/tribunal-type-add.component';
import { TribunalTypeDetailsComponent } from './Components/details/tribunal-type-details/tribunal-type-details.component';
import { TribunalTypeUpdateComponent } from './Components/update/tribunal-type-update/tribunal-type-update.component';
import { TribunalTypeListComponent } from './ComponentTribuanl/list/tribunal-type-list/tribunal-type-list.component';
import { AddTribunalTypeComponent } from './ComponentTribuanl/ajout/add-tribunal-type/add-tribunal-type.component';
import { DetailTribunalTypeComponent } from './ComponentTribuanl/details/detail-tribunal-type/detail-tribunal-type.component';
import { UpdateTribunalTypeComponent } from './ComponentTribuanl/modif/update-tribunal-type/update-tribunal-type.component';
import { CardsComponentComponent } from './Cards/cards-component/cards-component.component';
import { UpdateNotificationMoyenComponent } from './ComponentNotificationMoyen/modif/update-notification-moyen/update-notification-moyen.component';
import { DetailClientComponent } from './ComponentClientType/details/detail-client/detail-client.component';
import { AddClientTypeComponent } from './ComponentClientType/add/add-client-type/add-client-type.component';
import { UpdateClientTypeComponent } from './ComponentClientType/modif/update-client-type/update-client-type.component';
import { UpdateContentieuxTypeComponent } from './ComponentContentieuxType/modif/update-contentieux-type/update-contentieux-type.component';
import { UpdateDocTypeComponentComponent } from './ComponentDocumentType/update/update-doc-type-component/update-doc-type-component.component';
import { UpdateJugementTypeComponent } from './ComponentJugementType/modiff/update-jugement-type/update-jugement-type.component';
import { BureauTypeListComponent } from './ComponentBureauType/list/bureau-type-list/bureau-type-list.component';
import { DetailBureauTypeComponent } from './ComponentBureauType/details/detail-bureau-type/detail-bureau-type.component';
import { AddBureauTypeComponent } from './ComponentBureauType/add/add-bureau-type/add-bureau-type.component';
import { UpdateBureauTypeComponent } from './ComponentBureauType/modif/update-bureau-type/update-bureau-type.component';
import { AddBureauSpecialiteComponent } from './ComponentBureauSpecialite/add/add-bureau-specialite/add-bureau-specialite.component';
import { ListBureauSpecialiteComponent } from './ComponentBureauSpecialite/list/list-bureau-specialite/list-bureau-specialite.component';
import { DetailBureauSpecialiteComponent } from './ComponentBureauSpecialite/details/detail-bureau-specialite/detail-bureau-specialite.component';
import { UpdateBureauSpecialiteComponent } from './ComponentBureauSpecialite/modif/update-bureau-specialite/update-bureau-specialite.component';
import { ListAvocatSpecialiteComponent } from './ComponentAvocatSpecialite/list/list-avocat-specialite/list-avocat-specialite.component';
import { AffaireSensListComponent } from './ComponentAffaireSens/list/affaire-sens-list/affaire-sens-list.component';
import { AvocatSpecialiteAddComponent } from './ComponentAvocatSpecialite/add/avocat-specialite-add/avocat-specialite-add.component';
import { AddAffaireSensComponent } from './ComponentAffaireSens/add/add-affaire-sens/add-affaire-sens.component';
import { DetailAffaireSensComponent } from './ComponentAffaireSens/details/detail-affaire-sens/detail-affaire-sens.component';
import { UpdateAffaireSensComponent } from './ComponentAffaireSens/modif/update-affaire-sens/update-affaire-sens.component';
import { DetailAvocatSpecialiteComponent } from './ComponentAvocatSpecialite/details/detail-avocat-specialite/detail-avocat-specialite.component';
import { AvocatSpecialiteModifComponent } from './ComponentAvocatSpecialite/modiff/avocat-specialite-modif/avocat-specialite-modif.component';
import { BureauListComponent } from './ComponentBureau/list/bureau-list/bureau-list.component';
import { DetailBureauComponent } from './ComponentBureau/details/detail-bureau/detail-bureau.component';
import { AddBureauComponent } from './ComponentBureau/add/add-bureau/add-bureau.component';
import { UpdateBureauComponent } from './ComponentBureau/modif/update-bureau/update-bureau.component';
import { ExpertCompetenceListComponent } from './ComponentExpertCompetence/list/expert-competence-list/expert-competence-list.component';
import { ExpertCompetenceAddComponent } from './ComponentExpertCompetence/add/expert-competence-add/expert-competence-add.component';
import { DetailExComptComponent } from './ComponentExpertCompetence/detail/detail-ex-compt/detail-ex-compt.component';
import { UpdateExCompComponent } from './ComponentExpertCompetence/update/update-ex-comp/update-ex-comp.component';
import { EtablissementListComponent } from './ComponentEtablissement/list/etablissement-list/etablissement-list.component';
import { EtablissementAddComponent } from './ComponentEtablissement/add/etablissement-add/etablissement-add.component';
import { DetailEtablissementComponent } from './ComponentEtablissement/detail/detail-etablissement/detail-etablissement.component';
import { EtablissementModifComponent } from './ComponentEtablissement/modif/etablissement-modif/etablissement-modif.component';
import { SujetContentieuxListComponent } from './ComponentSujetContentieuxList/list/sujet-contentieux-list/sujet-contentieux-list.component';
import { AddSjtContentieuxComponent } from './ComponentSujetContentieuxList/add/add-sjt-contentieux/add-sjt-contentieux.component';
import { DetailSjtContentieuxComponent } from './ComponentSujetContentieuxList/details/detail-sjt-contentieux/detail-sjt-contentieux.component';
import { UpdateSjtContentieuxComponent } from './ComponentSujetContentieuxList/upp/update-sjt-contentieux/update-sjt-contentieux.component';
import { DossierAxesListComponent } from './ComponentDossierAxe/list/dossier-axes-list/dossier-axes-list.component';
import { AddDossierAxeComponent } from './ComponentDossierAxe/add/add-dossier-axe/add-dossier-axe.component';
import { DossierAxeDetailComponent } from './ComponentDossierAxe/detail/dossier-axe-detail/dossier-axe-detail.component';
import { DossierAxeModifComponent } from './ComponentDossierAxe/modification/dossier-axe-modif/dossier-axe-modif.component';
import { DossierPieceJointeListComponent } from './ComponentDossierPieceJointe/list/dossier-piece-jointe-list/dossier-piece-jointe-list.component';
import { DetailsdossierpjComponent } from './ComponentDossierPieceJointe/detail/detailsdossierpj/detailsdossierpj.component';
import { DossierPieceJointeAddComponent } from './ComponentDossierPieceJointe/add/dossier-piece-jointe-add/dossier-piece-jointe-add.component';
import { UpdatePieceJointeComponent } from './ComponentDossierPieceJointe/update/update-piece-jointe/update-piece-jointe.component';
import { PreContentieuxTypeAddComponent } from './ComponentPreContentieuxType/Add/pre-contentieux-type-add/pre-contentieux-type-add.component';
import { PreContentieuxTypeListComponent } from './ComponentPreContentieuxType/list/pre-contentieux-type-list/pre-contentieux-type-list.component';
import { DetailPreContentieuxTypeComponent } from './ComponentPreContentieuxType/Detail/detail-pre-contentieux-type/detail-pre-contentieux-type.component';
import { UpdatePreContentieuxTypeComponent } from './ComponentPreContentieuxType/Update/update-pre-contentieux-type/update-pre-contentieux-type.component';
import { DossierCategorieComponent } from './ComponentDossierCategorie/list/dossier-categorie/dossier-categorie.component';
import { AddDossCategComponent } from './ComponentDossierCategorie/add/add-doss-categ/add-doss-categ.component';
import { DetailDossCategComponent } from './ComponentDossierCategorie/detail/detail-doss-categ/detail-doss-categ.component';
import { DossierCategorieUpdateComponent } from './ComponentDossierCategorie/update/dossier-categorie-update/dossier-categorie-update.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      { path: 'tribunal-types', component: TribunalTypeListComponent },
      // { path: 'tribunal-add', component: TribunalTypeAddComponent },
      { path: 'tribunal-ajout', component: AddTribunalTypeComponent },
      // { path: 'tribunal-types/:id', component: TribunalTypeDetailsComponent      },
      { path: 'tribunal-types/:id', component: DetailTribunalTypeComponent     },
      // { path: 'update-tribunal/:id', component: TribunalTypeUpdateComponent }, // spring
      { path: 'update-tribunal/:id', component: UpdateTribunalTypeComponent }, // json
      { path: 'card', component:  CardsComponentComponent }, // json
      //////////////////////////
      { path: 'pro-types', component: ListProComponent },
      { path: 'professionnel-types/:id', component: ProfessionnelTypeDetailComponent },
      { path: 'pro-add', component: AddProComponent },
      { path: 'update-pro/:id', component: UpdateProfessionnelTypeComponent },
      //////////////////////////
      { path: 'state', component: EtatListComponent },
      { path: 'etat-detail/:id', component: EtatDetailComponent },
      { path: 'add-etat', component: AjoutEtatComponent },
      { path: 'etat-update/:id', component: UpdateEtatComponent },
      //////////////////////////
      { path: 'gov', component: GouvernoratListComponent },
      { path: 'add-gouvernorat', component: AddGouvernoratComponent },
      { path: 'update-gouvernorat/:id', component: UpdateGouvernoratComponent },
      { path: 'gouvernorat/:id', component: GouvernoratDetailComponent },
      //////////////////////////
      { path: 'notif', component: ListNotificationMoyenComponent},
      { path: 'notification-moyens/:id', component: NotificationMoyenDetailComponent },
      { path: 'notificationMoyens/add', component: AddNotificationMoyenComponent },
      {path:  'notif/update/:id', component: UpdateNotificationMoyenComponent }, 
      //////////////////////////
      { path: 'jugement', component: JugementTypeListComponent},
      { path: 'jugement-type/:id',component: JugementTypeDetailsComponent},
      { path: 'add-jugementType', component: AddJugementTypeComponent },
      { path: 'updateJugementType/:id', component: UpdateJugementTypeComponent },
      //////////////////////////
      { path: 'docTypes', component: DocumentTypeLisComponent },
      { path: 'docTypes/:id', component: DocumentTypeDetailsComponent },
      { path: 'add-doc-type', component: AddDocTypeComponent },
      { path: 'updateDocument/:id', component: UpdateDocTypeComponentComponent },
      //////////////////////////
      { path: 'list', component: ContentieuxTypeListComponent },
      { path: 'ContentieuxAdd', component: AddContentieuxTypeComponent },
      { path: 'contentieux-types/:id', component: ContentieuxTypeDetailComponent },
      { path: 'contentieuxUpdate/:id', component: UpdateContentieuxTypeComponent },
/////////////////////////////
      { path: 'client-types', component: ClientTypeListComponent },
      { path: 'client-type/:id',component: DetailClientComponent },
      { path: 'add-client', component: AddClientTypeComponent },
      { path: 'ClientUpdate/:id', component: UpdateClientTypeComponent }, // Route to update a client type by ID
      //////////////////////////
      { path: 'bureau-types', component: BureauTypeListComponent },
      { path: 'bureau-types/:id',component: DetailBureauTypeComponent },
      { path: 'bureauTypesAdd', component: AddBureauTypeComponent },
      { path: 'bureauTypesUpdate/:id',component: UpdateBureauTypeComponent },
     //////////////////////////
     { path: 'BureauSpecialiteAdd', component: AddBureauSpecialiteComponent},
     { path: 'BureauSpecialiteList', component: ListBureauSpecialiteComponent},
     { path: 'BureauSpecialiteDetail/:id', component: DetailBureauSpecialiteComponent},
     { path: 'BureauSpecialiteUpdate/:id', component: UpdateBureauSpecialiteComponent},
     //////////////////////////
     { path: 'AvocatSpecialiteList', component: ListAvocatSpecialiteComponent},
     { path: 'AvocatSpecialiteAdd', component: AvocatSpecialiteAddComponent},
     { path: 'DetailAvocatSpecialite/:id', component: DetailAvocatSpecialiteComponent },
     { path: 'UpdateAvocatSpecialite/:id', component: AvocatSpecialiteModifComponent },
      //////////////////////////
     { path: 'AffaireSensList', component: AffaireSensListComponent},
     { path: 'AffaireSensAdd', component: AddAffaireSensComponent},
     { path: 'AffaireSensDetail/:id', component: DetailAffaireSensComponent},
     { path: 'AffaireSensUpdate/:id', component: UpdateAffaireSensComponent},
      //////////////////////////
     { path: 'BureauList', component: BureauListComponent},
     { path: 'BureauDetail/:id', component: DetailBureauComponent},
     { path: 'BureauAdd', component: AddBureauComponent},
     { path: 'BureauUpdate/:id', component: UpdateBureauComponent},
 //////////////////////////
 { path: 'ExpertCompetenceList', component: ExpertCompetenceListComponent},
 { path: 'ExpertCompetenceAdd', component: ExpertCompetenceAddComponent},
 { path: 'ExpertCompetenceDetail/:id', component: DetailExComptComponent},
 { path: 'ExpertCompetenceUpp/:id', component: UpdateExCompComponent},
 //////////////////////////
 { path: 'EtablissementList', component: EtablissementListComponent},
 { path: 'EtablissementAdd', component: EtablissementAddComponent},
 { path: 'EtablissementDetail/:id', component: DetailEtablissementComponent},
 { path: 'EtablissementUpdate/:id', component: EtablissementModifComponent},
  //////////////////////////
 { path: 'SujetContentieuxList', component: SujetContentieuxListComponent},
 { path: 'SujetContentieuxAdd', component: AddSjtContentieuxComponent},
 { path: 'SujetContentieuxDetail/:id', component: DetailSjtContentieuxComponent},
 { path: 'SujetContentieuxUpp/:id', component: UpdateSjtContentieuxComponent},
  //////////////////////////
 { path: 'DossierAxesList', component: DossierAxesListComponent},
 { path: 'DossierAxesAdd', component: AddDossierAxeComponent},
 { path: 'dossier-axe-details/:id', component: DossierAxeDetailComponent},
 { path: 'dossier-axe-modif/:id', component: DossierAxeModifComponent},
   //////////////////////////
   { path: 'PieceJointeList', component: DossierPieceJointeListComponent},
   { path: 'PieceJointeDetails/:id', component: DetailsdossierpjComponent},
   { path: 'PieceJointeAdd', component: DossierPieceJointeAddComponent},
   { path: 'PieceJointeUpdate/:id', component: UpdatePieceJointeComponent},
//////////////////////////
{ path: 'PreContentieuxTypeAdd', component: PreContentieuxTypeAddComponent},
{ path: 'PreContentieuxTypeList', component: PreContentieuxTypeListComponent},
{ path: 'PreContentieuxType/:id', component: DetailPreContentieuxTypeComponent},
{ path: 'PreContentieuxTypeUpdate/:id', component: UpdatePreContentieuxTypeComponent},
///////////////////////////
{ path: 'dossier-categories', component: DossierCategorieComponent },
{ path: 'add-dossier-categorie', component: AddDossCategComponent },
{
  path: 'dossier-categories/:id',
  component: DetailDossCategComponent
},
{ path: 'dossier-categories-up/:id', component: DossierCategorieUpdateComponent }, // Route for updating an existing category

    ] 
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
