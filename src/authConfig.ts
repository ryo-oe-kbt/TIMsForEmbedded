// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-inferrable-types */

// Scope of AAD app. Use the below configuration to use all the permissions provided in the AAD app through Azure portal.
// Refer https://aka.ms/PowerBIPermissions for complete list of Power BI scopes
//export const scopes: string[] = [
//  'https://analysis.windows.net/powerbi/api/Report.Read.All',
//]
export const scopes: string[] = ["https://analysis.windows.net/powerbi/api/Report.Read.All"];

// Client Id (Application Id) of the AAD app.
//export const clientId: string = '4a9de777-c77d-4f0d-ba84-54650a1dc414'
export const clientId: string = "4a9de777-c77d-4f0d-ba84-54650a1dc414";

// Id of the workspace where the report is hosted
//export const workspaceId: string = 'fbe9e2cd-8aa7-42d8-bf45-75834c01fdba'
export const workspaceId: string = "fbe9e2cd-8aa7-42d8-bf45-75834c01fdba";


// Id of the report to be embedded
//export const reportId: string = 'd8425a56-f2bc-4532-82c1-9195ff547b75'
export const reportId: string = "3a3d8349-794c-4b18-80a4-f9c9e4dbdd06";
