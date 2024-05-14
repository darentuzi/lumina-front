// 'use client';

// Imports
// ------------
import React, { useState, useEffect, useContext } from 'react';
import init, { Node, NodeConfig } from '@package/lumina-node-wasm';
import Input from './Input';
import Button from '@parts/Button';
import Status from './Status';
import Terminal from './Terminal';
import Icon from '@icon';
import Typewriter from 'typewriter-effect';
import { GlobalContext } from '@parts/Contexts';

// Styles
// ------------
import { Blanket, Jacket, ImageContainer, Container, Title, NetworkList, NetworkItem } from './styles';

// Component
// ------------
const Form = () => {
    // NOTE • Contexts
    const { begin, setBegin } = useContext(GlobalContext);

    // NOTE • States
    const [node, setNode] = useState(null);
    const [config, setConfig] = useState({});
    const [go, setGo] = useState(false);
    const [modalOpen, setModalOpen] = useState({
        modal1: false,
        modal2: false,
    });
    const [nodeInitiate, setNodeInitiate] = useState(false);

    const [stats, setStats] = useState({
        peerId: '',
        syncInfo: '',
        connectedPeers: [],
        networkHeadHeight: '',
        networkHeadHash: '',
        networkHeadDataSquare: '',
    });

    // NOTE • Initialisation
    const fetchConfig = async () => {
        try {
            const response = await fetch('/cfg.json');
            if (!response.ok) {
                throw new Error('Failed to fetch configuration');
            }
            const json = await response.json();
    
            // Perform validation if necessary
            const config = NodeConfig.default(json.network);

            console.log('Fetched config:', config); // Debugging
    
            return config;
        } catch (error) {
            console.error('Error fetching configuration:', error);
            return null; // or handle the error in an appropriate way
        }
    };

    useEffect(() => {
        const loadConfig = async () => {
            const tempConfig = await fetchConfig();
            if (tempConfig) {
                // console.log('Setting config to state:', tempConfig); // Debugging
                setConfig(tempConfig);
            }
        };

        const initWASM = async () => {
            await init();
            loadConfig();
        };

        initWASM();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (node) {
                const info = await node.syncer_info();
                
                const peers = await node.connected_peers();

                const head = node.get_network_head_header();
                if (head) {

                    setStats({
                        ...stats,
                        syncInfo: `${info.local_head}/${info.subjective_head}`,
                        connectedPeers: peers,
                        networkHeadHeight: head.header.height,
                        networkHeadHash: head.commit.block_id.hash,
                        networkHeadDataSquare: `${head.dah.row_roots.length}x${head.dah.column_roots.length} shares`,
                    });
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [node]);

    const handleGhash = (e) => {
        setConfig({
            ...config,
            genesis_hash: e.target.value
        });
    }

    const handleBnodes = (e) => {
        setConfig({
            ...config,
            bootnodes: [e.target.value]
        });
    }

    const handleBegin = () => {
        setBegin(true);
        setModalOpen(prev => {
            return {
                ...prev,
                modal1: true,
            }
        });
    }

    const handleNetwork = (e) => {
        setConfig({
            ...config,
            network: Number(e)
        });
    }

    const handleInput = (e) => {
        setStats({
            ...stats,
            [e.target.name]: e.target.value
        });
    }

    const startNode = async () => {
        if (!config.genesis_hash || !config.bootnodes || config.bootnodes.length === 0) {
            alert('Genesis hash and at least one bootnode are required.');
            return;
        }
        try {
            let anotherConfig = config;
            setConfig({genesis_hash: config.genesis_hash, bootnodes: config.bootnodes});

            const newNode = await new Node(anotherConfig);
            
            setNode(newNode);
            
            setStats({
                ...stats,
                peerId: await newNode.local_peer_id(),
            });
        } catch (error) {
            console.error("Error initializing Node:", error);
        }
    };

    const initiateNode = () => {
        setGo(true);
        setModalOpen(prev => {
            return {
                ...prev,
                modal2: true,
            }
        });
        setNodeInitiate(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setNodeInitiate(false);
            startNode();
        }, 10500);

        return () => clearTimeout(timer);
    }, [nodeInitiate]);

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Blanket>
            <ImageContainer $active={begin}>
                <img src="/lumina.svg" alt="Lumina Logo" />
            </ImageContainer>

            <Jacket data-lenis-prevent style={{ zIndex: 1}}>
                <Container $begin>
                    <Title>
                        <Typewriter
                            options={{
                                delay: 25,
                                deleteSpeed: 25,
                                changeDelay: 25,
                            }}
                            onInit={(typewriter) => {
                                typewriter.typeString('Start your Celestia light node')
                                .changeDelay(25)
                                .changeDeleteSpeed(25)
                                .start();
                            }}
                        />
                    </Title>
                    <Button label="Start Sampling" onClick={handleBegin} />
                </Container>
            </Jacket>

            <Jacket data-lenis-prevent $modal={2} style={{ zIndex: 2, pointerEvents: modalOpen.modal1 ? 'all' : 'none'}}>
                <Container $network $activated={begin}>
                    <Title>Let's go!</Title>

                    <h3>Network</h3>
                    <NetworkList>
                        <NetworkItem $selected={config?.network === 0}>
                            <label>
                                <input type="radio" name="network" value="0" onChange={() => handleNetwork('0')} />
                                <Icon type="check" /><span>Mainnet</span>
                            </label>
                        </NetworkItem>
                        <NetworkItem $selected={config?.network === 1} $disabled>
                            <label>
                                <input type="radio" name="network" value="1" onChange={() => handleNetwork('1')} />
                                <Icon type="check" /><span>Arabica</span>
                            </label>
                        </NetworkItem>
                        <NetworkItem $selected={config?.network === 2} $disabled>
                            <label>
                                <input type="radio" name="network" value="2" onChange={() => handleNetwork('2')} />
                                <Icon type="check" /><span>Mocha</span>
                            </label>
                        </NetworkItem>
                    </NetworkList>

                    <h3>Genesis Hash</h3>
                    <Input value={config?.genesis_hash} onChange={handleGhash} placeholder="Genesis Hash..." />
                    {/* {config.genesis_hash ? config.genesis_hash : `Loading...`} */}

                    <h3>Bootnodes</h3>
                    <Input value={config?.bootnodes} onChange={handleBnodes} placeholder="Bootnodes..." />

                    <div>
                        <Button label="Start" onClick={initiateNode} disabled={node !== null || stats.peerId !== ''} />
                    </div>
                </Container>
            </Jacket>

            <Jacket data-lenis-prevent $modal={3} style={{ zIndex: 3, pointerEvents: modalOpen.modal2 ? 'all' : 'none'}}>
                <Container $go $activated={go}>
                    {nodeInitiate ? (
                        <Terminal />
                    ) : (
                        <Status
                            stats={stats}
                            handleInput={handleInput}
                            handleReload={handleReload}
                        />
                    )}
                </Container>
            </Jacket>
        </Blanket>
    );
};

export default Form;