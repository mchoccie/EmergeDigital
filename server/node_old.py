import ssl
from dotenv import load_dotenv
from os import environ, path
from pprint import pprint
from pymongo import MongoClient
import sys
from bson.objectid import ObjectId

# Importing Libraries
import _pickle as pickle
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from sklearn.decomposition import PCA
from sklearn.cluster import AgglomerativeClustering, KMeans
import numpy as np
import pandas as pd
import _pickle as pickle
# from db import connect
# from MatchMaking import MatchMaking
import random
import pprint
import time
pp = pprint.PrettyPrinter(indent=4)
# pprint library is used to make the output look more pretty


class MatchMaking:

    def __init__(self, dataset=None, profile=None):
        """
        Using a given DF of profiles, creates a new profile based on information from that given DF

        If profile already given, allows formatting of that profile
        """
        # Checking if we have DFs in our arguments
        # Initializing instances of the smaller profile DF and the larger DF
        if type(dataset) != pd.core.frame.DataFrame:
            print('WARNING! Dataset is not in pandas dataframe')
            self.dataset = pd.DataFrame()
        else:
            self.dataset = dataset

        # Handling the profile
        if type(profile) != pd.core.frame.DataFrame:
            print('WARNING! Profile is not in pandas dataframe')
            # Initializing a new DF for the new profile with a new index or user number
            try:
                self.profile = pd.DataFrame(index=[self.dataset.index[-1] + 1])
            # If starting from an empty DF
            except:
                self.profile = pd.DataFrame(index=[0])
        else:
            # Using the given profile
            self.profile = profile
        # A combined DF containing both the original data and the new profile, will be N/A until add_profile_to_dataset() is used
        self.combined_df = self.dataset
        self.vect_df = None
        self.corr_group = None
        self.random_user = None

    def add_profile_to_dataset(self):
        """
        Appends the new profile to the dataset to return a new larger dataset containing the brand new profile
        Only will use the original format of the DF, no vectorized or scaled DFs
        Append this new profile to dataset temporarily for matchmaking, not yet save the changes to the real dataset
        """
        dataset_feats = self.dataset.columns
        profile_feats = self.profile.columns

        # Check to see if the profile profile contains the same features as the larger profile
        if dataset_feats.all() == profile_feats.all():
            # Appending the profile the larger profile
            self.combined_df = self.combined_df.append(self.profile)
            # a temperory dataset
            return self.combined_df
        else:
            # If profile features/columns don't line up with the dataset's
            return "Profile features do not match larger dataset"

    def save_the_dataset(self, client, new_profile, df):
        """
        Update the original dataset (maybe save to mongodB too) and save it for future usage
        Check whether the dataset contains 'Cluster #'
        """
        if self.combined_df is None:
            print(
                'Please run the function add_to_dataset first, then run save_the_dataset.')
            return 'Failed saved'
        # self.combined_df.drop('Cluster #', axis=1, inplace=True)

        # dictionary = self.combined_df.to_dict('records')
        dictionary = new_profile.to_dict('records')
        to_add = dictionary[0]
        to_add['Age'] = str(to_add['Age'])

        _id = client.test.ai.insert_one(to_add)
        #print('UID of this user is :', new_profile['uid'])
        #print(df.loc[self.random_user, '_id'])
        print('Saved this user in ai table')
        return _id.inserted_id
        # print(dictionary[0])
        '''
        with open("dataset_local.pkl", 'wb') as fp:
            pickle.dump(self.combined_df, fp)
            return "Successfully saved"
        '''

    def update_the_dataset(self, client, new_profile, df, id):
        """
        Update the original dataset (maybe save to mongodB too) and save it for future usage
        Check whether the dataset contains 'Cluster #'
        """
        if self.combined_df is None:
            print(
                'Please run the function add_to_dataset first, then run save_the_dataset.')
            return 'Failed saved'
        # self.combined_df.drop('Cluster #', axis=1, inplace=True)

        # dictionary = self.combined_df.to_dict('records')
        #dictionary = new_profile.to_dict('records')
        #to_add = dictionary[0]
        #to_add['Age'] = str(to_add['Age'])
        change_set = {'Primary goal': str(new_profile['Primary goal']), 'Secondary goal': str(new_profile['Secondary goal']), 'Industry': str(
            new_profile['Industry']), 'Age': str(new_profile['Age']), 'Type': str(new_profile['Type']), 'Role': str(new_profile['Role'])}
        #_id = client.test.ai.insert_one(to_add)
        old_id = ObjectId(str(id))
        result = client.test.ai.update_one(
            {'uid': old_id}, {'$set': change_set})
        print('Updated this user in ai table')

        return result

    def vectorization(self, df, columns):
        """
        Using recursion, iterate through the df until all the categories have been vectorized
        """
        column_name = columns[0]

        # Checking if the column name has been removed already
        if column_name not in ['Primary goal', 'Secondary goal', 'Industry', 'Role', 'Gender']:
            return df

        # Instantiating the Vectorizer
        vectorizer = CountVectorizer()
        #vectorizer = TfidfVectorizer()
        # Fitting the vectorizer to the Bios
        x = vectorizer.fit_transform(df[column_name])
        # Creating a new DF that contains the vectorized words
        df_wrds = pd.DataFrame(
            x.toarray(), columns=vectorizer.get_feature_names_out())
        # Concating the words DF with the original DF
        new_df = pd.concat([df, df_wrds], axis=1)
        # Dropping the column because it is no longer needed in place of vectorization
        new_df = new_df.drop(column_name, axis=1)
        return self.vectorization(new_df, new_df.columns)

    def print_corr_group(self):
        print(self.corr_group)
        return

    def matchmaking(self, df):
        """
        Actual part of the AI matchmaking
        """
        # Creating the vectorised DF
        self.vect_df = self.vectorization(
            self.combined_df, self.combined_df.columns)

        self.vect_df.drop('Type', axis=1, inplace=True)

        scaler = MinMaxScaler()
        self.vect_df = pd.DataFrame(scaler.fit_transform(
            self.vect_df), index=self.vect_df.index, columns=self.vect_df.columns)

        # Instantiating PCA
        pca = PCA()
        # Fitting and Transforming the DF
        df_pca = pca.fit_transform(self.vect_df)
        # Finding the exact number of features that explain at least 99% of the variance in the dataset
        total_explained_variance = pca.explained_variance_ratio_.cumsum()
        n_over_9 = len(
            total_explained_variance[total_explained_variance >= .99])
        n_to_reach_9 = self.vect_df.shape[1] - n_over_9
        # Reducing the dataset to the number of features determined before
        pca = PCA(n_components=n_to_reach_9)
        # Fitting and transforming the dataset to the stated number of features
        df_pca = pca.fit_transform(self.vect_df)
        # Seeing the variance ratio that still remains after the dataset has been reduced
        pca.explained_variance_ratio_.cumsum()[-1]
        # number of clusters should be dynamically changed
        real_user_num = self.combined_df.loc[self.combined_df['Type']
                                             == 'real'].shape[0]
        if real_user_num == 0:
            print('Currently no real user')
            return None
        elif real_user_num == 1:
            print('Only one real user, need to at least add one more user')
            return None
        elif 1 < real_user_num <= 20:
            cluster_num = 3
        elif 20 < real_user_num <= 50:
            cluster_num = 5
        else:
            cluster_num = 9

        # Use the Kmeans clusterring
        k_means = KMeans(n_clusters=cluster_num)
        k_means.fit(df_pca)
        cluster_assignments = k_means.predict(df_pca)
        # Assigning the clusters to each profile
        self.combined_df['Cluster #'] = cluster_assignments
        self.vect_df['Cluster #'] = cluster_assignments

        # select the newly added user
        self.random_user = self.combined_df.index[-1]
        #print('For leader ', new_cluster.loc[[self.random_user]])
        # Choose the cluster where he/she belongs to
        rand_cluster = self.combined_df.loc[self.random_user, 'Cluster #']
        # Assigning the Cluster Profiles as a new DF
        group = self.combined_df[(self.combined_df['Cluster #'] == rand_cluster) & (
            self.combined_df['Role'] == 'Coach') & (self.combined_df['Type'] == 'real')].drop('Cluster #', axis=1)
        # group = self.combined_df[(self.combined_df['Cluster #']==rand_cluster) & (self.combined_df['Role']=='Coach')].drop('Cluster #', axis=1)

        # concatenate a new row in group for that random selected person
        group = pd.concat(
            [self.combined_df.iloc[[self.random_user]], group],  axis=0)
        group.drop('Cluster #', axis=1, inplace=True)
        col_list = ['Primary goal', 'Industry', 'Gender', 'Secondary goal']

        for i in range(0, len(col_list)):
            vectorizer = CountVectorizer()
            # Fitting the vectorizer to the Bios
            cluster_x = vectorizer.fit_transform(group[col_list[i]])
            # Creating a new DF that contains the vectorized words
            cluster_v = pd.DataFrame(cluster_x.toarray(
            ), index=group.index, columns=vectorizer.get_feature_names_out())
            # Joining the vector DF and the original DF
            group = group.join(cluster_v, lsuffix='_left')
            # Dropping the Bios because it is no longer needed in place of vectorization
            group.drop(col_list[i], axis=1, inplace=True)

        # Dropping the Bios because it is no longer needed in place of vectorization
        group.drop('Role', axis=1, inplace=True)
        group.drop('Type', axis=1, inplace=True)
        #group.drop('Age', axis=1, inplace=True)
        # print(group.dtypes)
        convert_dict = {'Age': int}
        group = group.astype(convert_dict)
        # print(group.dtypes)
        # Trasnposing the DF so that we are correlating with the index(users)
        self.corr_group = group.T.corr()

        # You can easily set them to some negative value, say -2 (which will necessarily be lower than all correlations) with
        np.fill_diagonal(self.corr_group.values, -2)

        # print("Top 3 most similar users to Leader #", self.random_user, '\n')
        # print(self.random_user)
        top_3_sim = self.corr_group[[self.random_user]].sort_values(
            by=[self.random_user], axis=0, ascending=False)[0:3]
        # display the top 3 user profile
        top_3 = self.combined_df.loc[top_3_sim.index]
        #print('this matched coach role is', self.combined_df.loc[top_3_sim.index[0], 'Role'])
        if len(top_3) == 1:
            print(
                'Not enough real coaches in the dataset can be matched to this user, please add more')
            return None
        # top_3[top_3.columns[1:]] = top_3[top_3.columns[1:]]
        # print(top_3_sim)
        # print("\nThe most similar coach to Leader #", self.random_user, "is Coach #", top_3_sim.index[0], '\n')
        # print(self.combined_df.iloc[self.random_user,:],'\n')
        # print(self.combined_df.iloc[top_3_sim.index[0],:])
        # need to decide what to return here, index, list or dataframe, currently just the top 1 matched coach
        # return self.combined_df.iloc[top_3_sim.index[0]]
        if self.combined_df.loc[top_3_sim.index[0], 'Role'] == 'Leader':
            return top_3_sim.index[1]
        else:
            return top_3_sim.index[0]


def connect():
    #basedir = path.abspath(path.dirname(__file__))
    #load_dotenv(path.join(basedir, '.env'))
    # connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
    #client = MongoClient(environ.get('MONGODB_URL'), ssl_cert_reqs=ssl.CERT_NONE)
    # Issue the serverStatus command and print the results
    # serverStatusResult = .command("serverStatus")
    # pprint(serverStatusResult)
    client = MongoClient(
        'mongodb+srv://mcho6881:obamamilk@cluster0.2sa4e.mongodb.net/test', ssl_cert_reqs=ssl.CERT_NONE)
    return client


if __name__ == "__main__":
    print('Hey!')

    # sys.argv[1] is the data['primary-goal'] = 'Perfectionism and Procrastination'
    # sys.argv[2] is the data['secondary-goal'] = 'Giving and Receiving Feedback'
    # sys.argv[3] is the data['industry'] = 'Agriculture, Forestry, Fishing'
    # sys.argv[4] is the data['gender'] = 'Male'
    # sys.argv[5] is the data['age'] = 45
    # sys.argv[6] is the data['role'] = 'Leader'
    # sys.argv[7] is the data['uid'] = 323
    # sys.argv[8] is the data['Type'] = 'real'
    data = {}
    data['primary-goal'] = sys.argv[1].capitalize()
    data['secondary-goal'] = sys.argv[2].capitalize()
    data['industry'] = sys.argv[3].capitalize()
    data['gender'] = sys.argv[4].capitalize()
    data['age'] = sys.argv[5]
    data['role'] = sys.argv[6].capitalize()
    data['uid'] = sys.argv[7]  # user actual id
    print(sys.argv[7])
    data['Type'] = sys.argv[8]

    pp.pprint(data)

    # connect to db
    client = connect()
    df_ai = pd.DataFrame(list(client.test.ai.find()))
    df_matched = pd.DataFrame(list(client.test.matched.find()))
    is_existing = 0
    # examine if a same id has occured in ai table before,
    # if so, then we update this user's old info and match him/her with a coach
    things = client.test.ai.find_one({'uid': str(sys.argv[7])})
    #things = client.test.ai.find_one({'_id': ObjectId('6185f944088fcfa5800e13c2')})
    if things is not None:
        print('This user exists')
        is_existing = 1

    df = df_ai.drop('_id', axis=1)

    df.drop('', axis=1, inplace=True)

    if 'uid' in df.columns:
        df.drop('uid', axis=1, inplace=True)

    # Instantiating a new DF row to append later
    new_profile = pd.DataFrame(columns=df.columns)
    # Adding random values for new data
    for i in new_profile.columns[0:]:
        new_profile[i] = np.random.randint(0, 10, 1)

    # print(data['role'].capitalize())
    # print(type(data['role'].capitalize()))
    new_profile['Primary goal'] = data['primary-goal'].capitalize()
    new_profile['Secondary goal'] = data['secondary-goal'].capitalize()
    new_profile['Industry'] = data['industry'].capitalize()
    new_profile['Gender'] = data['gender'].capitalize()
    # new_profile['Role'] = data['role']
    # new_profile['Role'] = data['role'].capitalize()
    new_profile['Role'] = data['role'].capitalize()
    new_profile['Age'] = data['age']
    new_profile['Type'] = 'real'
    new_profile['uid'] = data['uid']
    # Indexing that new profile data
    new_profile.index = [df.index[-1] + 1]

    to_add_new_profile = new_profile.drop('uid', axis=1)
    # Instantiating the class object
    if (df is not None) and (to_add_new_profile is not None):
        new_user = MatchMaking(dataset=df, profile=to_add_new_profile)

    if new_user is not None:

        the_role = new_profile.loc[new_profile['Role'] == 'Leader'].shape[0]
        the_type = new_profile.loc[new_profile['Type'] == 'real'].shape[0]

        # if he/she is a leader, then we need to pair with a coach
        if the_role == 1 and the_type == 1:
            # Matchmaking to find the matched coach
            new_user.add_profile_to_dataset()
            matched_coach = new_user.matchmaking(df_ai)

            # if this user has a matched coach
            if matched_coach is not None:
                matched_coach_id = df_ai.loc[matched_coach, 'uid']

                print('Your matched coach is ', matched_coach_id)
                user_id = new_profile.iloc[0]['uid']

                to_insert = {"Leader id": str(
                    user_id), "Matched coach id": str(matched_coach_id)}

                # insert the leader's id and matched coach's id to matched table
                if is_existing == 0:
                    print('This new added user id is :', user_id)
                    client.test.matched.insert_one(to_insert)
                    print('Saved this user in matched table')
                else:
                    # Update the matched coach result for this existing user in matched table
                    print('This existing user id is :', user_id)
                    change_set = {'Matched coach id': str(matched_coach_id)}
                    #_id = client.test.ai.insert_one(to_add)
                    result = client.test.matched.update_one(
                        {'uid': str(sys.argv[7])}, {'$set': change_set})
                    print('Updated this user in matched table')

            # save this new user file into the df_ai
            if is_existing == 0:
                user_id = new_user.save_the_dataset(
                    client, new_profile, df_ai)
            else:
                # update the existing value
                user_id = new_user.update_the_dataset(
                    client, new_profile, df_ai, sys.argv[7])
        # if he/she is a coach, just save this new profile to the dataset
        else:
            new_user.add_profile_to_dataset()
            new_user.save_the_dataset(client, new_profile, df_ai)
            print('Successfully added a coach')

        # nothing to return
        # print(dataToSendBack)
        # sys.stdout.flush()
    sys.stdout.flush()
