'use client'

export interface Activator {
    factor: string;
    value: string;
}

export interface Factor {
    // the attribute names that are form this factor (e.g. pod name and pod uuid are part of the same factor)
    names: string[];
    // if one of the factors in this list is defined, then this attribute does not have effect
    // on the cardinality
    // it is transitive
    // value is the factor name
    shadowedBy?: string[];

    activeIf?: Activator[];

    values?: string[];
}


export type FactorsMap = { [name: string]: Factor };

export const applicationFactors: FactorsMap = {
    "#metrics": {
        names: ["__name__"],
        shadowedBy: [],
        values: [
            "http.client.request.duration",
            "http.client.request.body.size",
            "http.server.request.duration",
            "http.server.request.body.size",
            "rpc.client.duration",
            "rpc.server.duration",
            "sql.client.duration",
            "redis.client.duration",
            "messaging.publish.duration",
            "messaging.process.duration"
        ]
    },
    "#owner": {
        names: ["service.name", "k8s.daemonset.name", "k8s.deployment.name", "k8s.node.name", "k8s.owner.name", "k8s.replicaset.name", "k8s.statefulset.name"],
        shadowedBy: ["#pods"],
    },
    "#pods": {
        names: ["k8s.pod.name", "k8s.container.name", "k8s.pod.start_time", "k8s.pod.uid"],
        shadowedBy: ["#instances"],
    },
    "#namespaces": {
        names: ["k8s.namespace.name", "service.namespace"],
    },
    "#instances": {
        names: ["target.instance", "client.address", "server.address", "messaging.destination.name"],
    },
    "#methods": {
        names: ["http.request.method", "rpc.method", "db.operation.name"],
    },
    "#status_codes": {
        names: ["http.response.status_code", "rpc.grpc.status_code"],
    },
    "#routes": {
        names: ["http.route"],
    },
    "#paths": {
        names: ["url.path"],
    },
};

/*
Ignoring for simplicity:
`rpc.system`                 
db.operation.name`          
`db.collection.name`         
`messaging.system`           


Below won't take effect if Pod or Owner metrics are visible.
`service.name`               
`service.namespace`          
`target.instance`            
`server.address`             
*/